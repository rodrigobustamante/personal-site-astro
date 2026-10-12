/** Plays the blog figures (see Figure.astro). */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setupFigure(fig: HTMLElement) {
  fig.dataset.figReady = '';
  const root = fig.querySelector<HTMLElement>('.fig-scene > *');
  if (!root) return;
  const labels: string[] = JSON.parse(fig.dataset.labels ?? '[]');
  const total = labels.length;
  const interval = Number(fig.dataset.interval) || 1900;
  const items = [...root.querySelectorAll<HTMLElement>('[data-b]')];
  const segs = [...fig.querySelectorAll<HTMLButtonElement>('.fig-seg')];
  const count = fig.querySelector<HTMLElement>('.fig-now b');
  const now = fig.querySelector<HTMLElement>('[data-now]');
  fig.style.setProperty('--fig-interval', `${interval}ms`);

  let step = total;
  let timer = 0;

  function show(next: number, { instant = false, running = false } = {}) {
    step = next;
    if (instant) fig.classList.add('fig-instant');
    for (const el of items) {
      const out = el.dataset.out ? Number(el.dataset.out) : Infinity;
      el.classList.toggle('on', step >= Number(el.dataset.b) && step < out);
    }
    for (let i = 1; i <= total; i++) root!.classList.toggle(`at-${i}`, step >= i);
    segs.forEach((seg, i) => {
      const n = i + 1;
      seg.dataset.state = n < step || (n === step && !running) ? 'done' : n === step ? 'run' : 'todo';
      if (n === step) seg.setAttribute('aria-current', 'step');
      else seg.removeAttribute('aria-current');
    });
    if (count) count.textContent = `${step}/${total}`;
    if (now) now.textContent = labels[step - 1] ?? '';
    if (instant) {
      void fig.offsetWidth;
      fig.classList.remove('fig-instant');
    }
  }

  function stop() {
    window.clearTimeout(timer);
    timer = 0;
  }

  function advance() {
    const next = step + 1;
    show(next, { running: next < total });
    if (next < total) timer = window.setTimeout(advance, interval);
    else timer = 0;
  }

  function play() {
    stop();
    show(1, { instant: true, running: true });
    timer = window.setTimeout(advance, interval);
  }

  segs.forEach((seg, i) =>
    seg.addEventListener('click', () => {
      stop();
      show(i + 1);
    })
  );
  fig.querySelector('.fig-replay')?.addEventListener('click', play);

  // Reduced motion keeps the still, last step; the bar still steps through it.
  if (reduceMotion.matches) return;
  show(1, { instant: true });
  new IntersectionObserver(
    ([entry], observer) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      play();
    },
    { threshold: 0.6 }
  ).observe(fig);
}

function initFigures() {
  document.querySelectorAll<HTMLElement>('[data-fig]:not([data-fig-ready])').forEach(setupFigure);
}

document.addEventListener('astro:page-load', initFigures);
