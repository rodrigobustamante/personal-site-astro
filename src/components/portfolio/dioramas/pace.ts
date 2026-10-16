/**
 * PACE case study header: an athletics track with a grandstand, floodlights
 * and a scoreboard plotting a rising fitness curve. The loop (a runner lapping
 * lane one, paced by a band of lights along the kerb) is CSS only and sits
 * behind prefers-reduced-motion; the static frame is a complete scene on its
 * own.
 */
import { createScene, r1, type Scene, type V } from './iso';

const { proj, poly, line, box, slab, paths, mark, beacons, viewBox } = createScene();

const AX = 24;
const AY = 17;

// Track: two straights joined by semicircles, run anticlockwise (seen from
// above). Its centre line starts halfway down the near straight.
const T = { cx: 12, cy: 9.6, half: 5, kerb: 4.2, lane: 0.45, lanes: 4 };
const outer = T.kerb + T.lane * T.lanes;

/** Points around the track at radius r from the centre line of the bends, from the near straight's midpoint. */
function oval(r: number, n = 24): V[] {
  const { cx, cy, half } = T;
  const arc = (x: number, from: number) =>
    Array.from({ length: n + 1 }, (_, k): V => {
      const a = ((from + (180 * k) / n) * Math.PI) / 180;
      return [x + r * Math.cos(a), cy + r * Math.sin(a), 0];
    });
  return [[cx, cy + r, 0], ...arc(cx - half, 90), ...arc(cx + half, -90)];
}
const ring = (r: number) =>
  `M${oval(r)
    .map((p) => proj(p).map(r1).join(' '))
    .join('L')}Z`;

const surface = mark('soft0', ring(outer));
const infield = mark('ground0', ring(T.kerb));
// Infield grass, mown in stripes across the track
const mow = Array.from({ length: 8 }, (_, i) => {
  const x = T.cx - T.half - T.kerb + i * 2.2;
  return poly([
    [x, T.cy - T.kerb, 0],
    [x + 1.1, T.cy - T.kerb, 0],
    [x + 1.1, T.cy + T.kerb, 0],
    [x, T.cy + T.kerb, 0],
  ]);
}).join('');
const laneLines = Array.from({ length: T.lanes + 1 }, (_, i) => ring(T.kerb + i * T.lane)).join('');
const finish = line([T.cx - 1.6, T.cy + T.kerb, 0], [T.cx - 1.6, T.cy + outer, 0]);

// Grandstand behind the far straight: tiers rising away from the track, a
// back wall and a canopy on posts.
const G = { x0: 5, x1: 16 };
const gw = G.x1 - G.x0;
const tiers = [0, 1, 2].flatMap((i) => box(G.x0, 2.3 - i * 0.75, 0, gw, 0.75, 0.5 * (i + 1), 'wall'));
const seats = [0, 1, 2].map((i) =>
  mark('dio-seats', line([G.x0 + 0.3, 3.03 - i * 0.75, 0.5 * (i + 1)], [G.x1 - 0.3, 3.03 - i * 0.75, 0.5 * (i + 1)]))
);
const grandstand = [...box(G.x0, 0.5, 0, gw, 0.3, 3.4, 'wall'), ...tiers];
const posts = [G.x0 + 0.2, G.x1 - 0.4].map((x) => mark('dio-leg', line([x, 1.85, 1.5], [x, 1.85, 3.4])));
const canopy = box(G.x0 - 0.2, 0.4, 3.4, gw + 0.4, 1.6, 0.2, 'roof');

// Floodlight masts at both ends of the stand
const mast = (x: number) => [
  ...box(x, 1.2, 0, 0.35, 0.35, 5.2, 'deep'),
  ...box(x - 0.3, 1.1, 5.2, 0.95, 0.55, 0.45, 'soft'),
];
const [mastLeft, mastRight] = [mast(G.x0 - 1.1), mast(G.x1 + 0.8)];

// Scoreboard in the far corner, plotting a fitness curve that keeps rising
const B = { x0: 19.6, x1: 22.9, y: 1.4, z0: 1.6, z1: 3.7 };
const board = [
  ...box(B.x0 + 0.4, B.y + 0.05, 0, 0.2, 0.2, B.z0, 'wall'),
  ...box(B.x1 - 0.6, B.y + 0.05, 0, 0.2, 0.2, B.z0, 'wall'),
  ...box(B.x0, B.y, B.z0, B.x1 - B.x0, 0.3, B.z1 - B.z0, 'deep'),
];
const plot = (fn: (t: number) => number) => {
  const pts = Array.from({ length: 13 }, (_, k): V => {
    const t = k / 12;
    return [B.x0 + 0.3 + t * (B.x1 - B.x0 - 0.6), B.y + 0.32, B.z0 + 0.3 + fn(t) * (B.z1 - B.z0 - 0.6)];
  });
  return `M${pts.map((p) => proj(p).map(r1).join(' ')).join('L')}`;
};
const fitness = mark(
  'dio-chart',
  plot((t) => 0.15 + 0.7 * (1 - Math.exp(-2.4 * t)))
);
const fatigue = mark(
  'dio-chart dio-chart-soft',
  plot((t) => 0.35 + 0.25 * Math.sin(t * 9) * (1 - t * 0.4))
);

// Runner in lane one (drawn below, once the lap is measured)
const RUN = T.kerb + T.lane / 2;
const path = oval(RUN, 48);
const [px, py] = path[0];

// The lap as projected on screen, with cumulative length: the runner's
// keyframes and the pacing lights' dash both measure along it, so they stay
// together without relying on pathLength (WebKit doesn't scale dash offsets).
const lap = [...path, path[0]].map((p) => proj(p));
const acc = lap.reduce<number[]>(
  (out, p, i) => [...out, i ? out[i - 1] + Math.hypot(p[0] - lap[i - 1][0], p[1] - lap[i - 1][1]) : 0],
  []
);
const LEN = acc[acc.length - 1];
/** Screen offset from the start after travelling `d` along the lap. */
function along(d: number) {
  const i = Math.max(
    1,
    acc.findIndex((a) => a >= d)
  );
  const t = (d - acc[i - 1]) / (acc[i] - acc[i - 1] || 1);
  const [dx, dy] = [0, 1].map((j) => lap[i - 1][j] + t * (lap[i][j] - lap[i - 1][j]) - lap[0][j]);
  return { dx, dy, i };
}
const SAMPLES = 40;
const runFrames =
  Array.from({ length: SAMPLES }, (_, k) => {
    const { dx, dy } = along((LEN * k) / SAMPLES);
    return `${r1((100 * k) / SAMPLES)}%{transform:translate(${r1(dx)}px,${r1(dy)}px)}`;
  }).join('') + '100%{transform:none}';
const lapPath = `M${lap
  .slice(0, -1)
  .map((p) => p.map(r1).join(' '))
  .join('L')}Z`;
const [dash, lead] = [r1(LEN * 0.035), r1(LEN * 0.012)];

// The runner, after the PACE illustration: white tee, black shorts, yellow
// shoes, dark hair and glasses, built from boxes. It comes in four headings,
// one per stretch of the lap, each in two strides that swap as it runs.
type Dir = [number, number];
const HEADINGS: Dir[] = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
const K = 1.3;
type Part = { f: number; s: number; z: number; df: number; ds: number; dz: number; mat: string };
const part = (f: number, s: number, z: number, df: number, ds: number, dz: number, mat: string): Part => ({
  f,
  s,
  z,
  df,
  ds,
  dz,
  mat,
});

/** One pose: `k` is 1 or -1 and picks which leg (and opposite arm) is forward. */
function pose(k: 1 | -1): Part[] {
  const limbs = [1, -1].flatMap((side) => {
    const swing = side * k * 0.2;
    const lift = swing < 0 ? 0.12 : 0;
    return [
      part(swing + 0.07, side * 0.12, lift, 0.34, 0.17, 0.05, 'sole'),
      part(swing + 0.07, side * 0.12, lift + 0.05, 0.34, 0.17, 0.12, 'shoe'),
      part(swing, side * 0.12, lift + 0.17, 0.15, 0.15, 0.8 - lift, 'skin'),
      // Arm: skin below, the tee's sleeve on top, swinging as one piece
      part(-swing * 0.5, side * 0.3, 1.32, 0.13, 0.11, 0.46, 'skin'),
      part(-swing * 0.5, side * 0.3, 1.78, 0.17, 0.13, 0.24, 'tee'),
    ];
  });
  return [
    ...limbs,
    part(0, 0, 0.95, 0.34, 0.46, 0.36, 'shorts'),
    part(0, 0, 1.3, 0.34, 0.48, 0.75, 'tee'),
    part(0, 0, 2.05, 0.14, 0.14, 0.08, 'skin'),
    part(0.01, 0, 2.12, 0.32, 0.3, 0.32, 'skin'),
    // Hair: a full cap, a fringe over the forehead, sideburns and the back
    part(-0.15, 0, 2.16, 0.08, 0.34, 0.3, 'hair'),
    part(-0.02, 0, 2.38, 0.38, 0.34, 0.16, 'hair'),
    part(0.155, 0, 2.36, 0.04, 0.3, 0.06, 'hair'),
    part(0, 0.16, 2.26, 0.2, 0.03, 0.14, 'hair'),
    part(0, -0.16, 2.26, 0.2, 0.03, 0.14, 'hair'),
  ];
}

function figure([hx, hy]: Dir, k: 1 | -1) {
  const [sx, sy] = [-hy, hx];
  const at = (f: number, s: number, z: number): V => [px + K * (hx * f + sx * s), py + K * (hy * f + sy * s), K * z];
  const boxes = pose(k)
    .map((q) => {
      const [cx, cy] = at(q.f, q.s, 0);
      const wx = K * (Math.abs(hx) * q.df + Math.abs(sx) * q.ds);
      const wy = K * (Math.abs(hy) * q.df + Math.abs(sy) * q.ds);
      // Height counts as much as depth: of two stacked parts, the higher one is drawn later
      return { depth: cx + cy + K * q.z, shapes: box(cx - wx / 2, cy - wy / 2, K * q.z, wx, wy, K * q.dz, q.mat) };
    })
    .sort((a, b) => a.depth - b.depth);
  // Glasses: the front of the lenses when the face is towards the viewer,
  // and the arm on whichever side shows.
  const front = hx + hy > 0 ? line(at(0.18, -0.12, 2.29), at(0.18, 0.12, 2.29)) : '';
  const side = sx + sy > 0 ? 0.16 : -0.16;
  const arm = line(at(0.17, side, 2.29), at(-0.02, side, 2.29));
  return paths(boxes.flatMap((b) => b.shapes)) + mark('dio-glasses', front + arm);
}

const runner = [
  mark(
    'dio-shadow',
    poly([
      [px - 0.45, py - 0.35, 0],
      [px + 0.45, py - 0.35, 0],
      [px + 0.45, py + 0.35, 0],
      [px - 0.45, py + 0.35, 0],
    ])
  ),
  ...HEADINGS.map(
    (h, i) =>
      `<g class="dio-heading dio-heading-${i}"><g class="dio-stride-a">${figure(h, 1)}</g><g class="dio-stride-b">${figure(h, -1)}</g></g>`
  ),
].join('');

// Which heading shows at each sample: the one closest to the lap's direction there.
const loop = [...path, path[0]];
const headingAt = (k: number) => {
  const { i } = along((LEN * k) / SAMPLES);
  const [tx, ty] = [loop[i][0] - loop[i - 1][0], loop[i][1] - loop[i - 1][1]];
  const dots = HEADINGS.map(([hx, hy]) => hx * tx + hy * ty);
  return dots.indexOf(Math.max(...dots));
};
const headingFrames = HEADINGS.map((_, h) => {
  let prev = -1;
  const frames = Array.from({ length: SAMPLES }, (_, k) => {
    const on = headingAt(k) === h ? 1 : 0;
    if (on === prev) return '';
    prev = on;
    return `${r1((100 * k) / SAMPLES)}%{opacity:${on}}`;
  }).join('');
  return `@keyframes dio-heading-${h}{${frames}100%{opacity:${headingAt(0) === h ? 1 : 0}}}`;
}).join('');

// Fixed colours for the runner, shaded towards a warm black in both themes
const SKIN: Record<string, string> = {
  skin: '#e5ae86',
  tee: '#f6f4f0',
  shorts: '#242326',
  shoe: '#f2c31f',
  sole: '#fbfaf6',
  hair: '#3a2a20',
};
const runnerCss = Object.entries(SKIN)
  .flatMap(([m, c]) =>
    [0, 8, 16, 26].map((k, t) => `.dio .${m}${t}{--f:color-mix(in oklab, ${c}, var(--dio-shade) ${k}%)}`)
  )
  .join('');

const svg = [
  paths(slab(AX, AY)),
  paths(mastLeft),
  paths(grandstand),
  ...seats,
  ...posts,
  paths(canopy),
  paths(mastRight),
  paths(board),
  fitness,
  fatigue,
  surface,
  infield,
  `<defs><clipPath id="dio-pace-infield"><path d="${ring(T.kerb)}"/></clipPath></defs>`,
  `<g clip-path="url(#dio-pace-infield)">${mark('dio-mow', mow)}</g>`,
  mark('dio-lanes', laneLines),
  mark('dio-finish', finish),
  mark('dio-pacer', lapPath),
  `<g class="dio-runner">${runner}</g>`,
  beacons([
    [G.x0 - 0.62, 1.37, 5.75],
    [G.x1 + 1.28, 1.37, 5.75],
    [B.x1 - 0.15, B.y + 0.15, B.z1 + 0.05],
  ]),
].join('');

// The runner laps the track while the pacing lights run just ahead of it.
const LAP = '14s';
const css = `
.dio .dio-lanes { fill: none; stroke: var(--dio-body); stroke-width: 0.8; opacity: 0.55; }
.dio .dio-finish { fill: none; stroke: var(--dio-body); stroke-width: 2.4; opacity: 0.85; }
.dio .dio-leg { fill: none; stroke: var(--dio-wall); stroke-width: 1.2; }
.dio .dio-seats { fill: none; stroke: var(--accent); stroke-width: 1.6; stroke-linecap: round; stroke-dasharray: 0 5; opacity: 0.7; }
.dio .dio-chart { fill: none; stroke: var(--accent); stroke-width: 1.6; stroke-linecap: round; }
.dio .dio-chart-soft { stroke: var(--dio-body); stroke-width: 1; opacity: 0.6; }
.dio .dio-pacer { fill: none; stroke: var(--accent); stroke-width: 2.4; stroke-linecap: round; stroke-dasharray: ${dash} ${r1(LEN - dash)}; stroke-dashoffset: -${lead}; }
.dio .dio-mow { fill: color-mix(in oklab, var(--paper-2), var(--dio-tone) calc(var(--dio-k0) + 4%)); }
${runnerCss}
.dio .dio-glasses { fill: none; stroke: #1b1b1b; stroke-width: 0.8; stroke-linecap: round; }
.dio .dio-heading, .dio .dio-stride-b { opacity: 0; }
.dio .dio-heading-${headingAt(0)} { opacity: 1; }
@media (prefers-reduced-motion: no-preference) {
  .dio .dio-runner { animation: dio-run ${LAP} linear infinite both; }
  .dio .dio-pacer { animation: dio-pacer ${LAP} linear infinite both; }
  .dio .dio-stride-a { animation: dio-stride 0.5s steps(1) infinite both; }
${HEADINGS.map((_, h) => `  .dio .dio-heading-${h} { animation: dio-heading-${h} ${LAP} steps(1) infinite both; }`).join('\n')}
  .dio .dio-stride-b { animation: dio-stride 0.5s steps(1) -0.25s infinite both; }
}
@keyframes dio-run {${runFrames}}
${headingFrames}
@keyframes dio-pacer {
  from { stroke-dashoffset: -${lead}; }
  to { stroke-dashoffset: -${r1(lead + LEN)}; }
}
@keyframes dio-stride {
  0% { opacity: 1; }
  50% { opacity: 0; }
}`;

export const paceScene: Scene = { viewBox: viewBox(), svg, css };
