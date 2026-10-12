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

// Runner in lane one: legs swap between two strides as it goes
const RUN = T.kerb + T.lane / 2;
const path = oval(RUN, 48);
const [px, py] = path[0];
const legs = (spread: number) => [-1, 1].map((k) => line([px, py, 1.25], [px + k * spread, py, 0])).join('');
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
  mark('dio-stride dio-stride-a', legs(0.5)),
  mark('dio-stride dio-stride-b', legs(0.15)),
  paths([
    ...box(px - 0.25, py - 0.25, 1.2, 0.5, 0.5, 1, 'roof'),
    ...box(px - 0.2, py - 0.2, 2.3, 0.4, 0.4, 0.4, 'body'),
  ]),
].join('');

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
  return [0, 1].map((j) => lap[i - 1][j] + t * (lap[i][j] - lap[i - 1][j]) - lap[0][j]);
}
const SAMPLES = 40;
const runFrames =
  Array.from({ length: SAMPLES }, (_, k) => {
    const [dx, dy] = along((LEN * k) / SAMPLES);
    return `${r1((100 * k) / SAMPLES)}%{transform:translate(${r1(dx)}px,${r1(dy)}px)}`;
  }).join('') + '100%{transform:none}';
const lapPath = `M${lap
  .slice(0, -1)
  .map((p) => p.map(r1).join(' '))
  .join('L')}Z`;
const [dash, lead] = [r1(LEN * 0.035), r1(LEN * 0.012)];

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
.dio .dio-mow { fill: color-mix(in oklab, var(--paper-2), var(--ink) calc(var(--dio-k0) + 4%)); }
.dio .dio-stride { fill: none; stroke: var(--ink); stroke-width: 1.3; stroke-linecap: round; }
.dio .dio-stride-b { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .dio .dio-runner { animation: dio-run ${LAP} linear infinite both; }
  .dio .dio-pacer { animation: dio-pacer ${LAP} linear infinite both; }
  .dio .dio-stride-a { animation: dio-stride 0.5s steps(1) infinite both; }
  .dio .dio-stride-b { animation: dio-stride 0.5s steps(1) -0.25s infinite both; }
}
@keyframes dio-run {${runFrames}}
@keyframes dio-pacer {
  from { stroke-dashoffset: -${lead}; }
  to { stroke-dashoffset: -${r1(lead + LEN)}; }
}
@keyframes dio-stride {
  0% { opacity: 1; }
  50% { opacity: 0; }
}`;

export const paceScene: Scene = { viewBox: viewBox(), svg, css };
