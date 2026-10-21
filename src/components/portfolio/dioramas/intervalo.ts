/**
 * Intervalo case study header: a metro viaduct crossing a city block, with a
 * second line coming up from a tunnel to its terminus. The loop (each train
 * pulls into its station and the arrival sounds: a ring opens on the platform
 * and a couple of notes rise from it, as in the app) is CSS only and sits
 * behind prefers-reduced-motion; the static frame is a complete scene on its
 * own.
 */
import { createScene, r1, type Block, type Scene, type Shape, type V } from './iso';

const { proj, poly, line, shift, box, slab, paths, mark, beacons, viewBox, blocks, windows, city } = createScene();

const AX = 24;
const AY = 17;

// City behind the viaduct, along the back edges
const BACK: Block[] = [
  [1, 1, 3, 4, 2.6, 'wall'],
  [5, 0.8, 3.2, 3, 3.8, 'wall'],
  [9.2, 1.2, 2.6, 3.6, 2.2, 'wall'],
  [13, 0.8, 3, 3.2, 3.2, 'wall'],
  [17, 1.2, 2.6, 3.4, 2.2, 'wall'],
  [20.5, 1, 2.6, 3, 2.8, 'wall'],
];
const backCity = city(BACK);

// Line A runs on a viaduct along x and pulls into a station halfway; past it,
// the track enters a tall interchange building at the near end.
const A = { y0: 7.8, y1: 9.2, z: 1.9, deck: 0.3, sx0: 7.8, sx1: 14.8, tower: 19 };
const top = A.z + A.deck;
const pillars = [1.5, 5, 9.5, 13, 16.5].flatMap((x) => box(x, 8.25, 0, 0.5, 0.5, A.z, 'wall'));
const deck = [
  ...box(0, A.y0, A.z, A.sx0, A.y1 - A.y0, A.deck, 'wall'),
  ...box(A.sx0, 7, A.z, A.sx1 - A.sx0, 3, A.deck, 'wall'),
  ...box(A.sx1, A.y0, A.z, A.tower - A.sx1, A.y1 - A.y0, A.deck, 'wall'),
];
const platform = (y: number) => box(A.sx0, y, top, A.sx1 - A.sx0, 0.75, 0.12, 'wall');
const farPosts = [A.sx0 + 0.4, A.sx1 - 0.4].map((x) => mark('dio-post', line([x, 7.2, top + 0.12], [x, 7.2, 3.8])));
const canopy = box(A.sx0 - 0.2, 6.8, 3.8, A.sx1 - A.sx0 + 0.4, 1.05, 0.16, 'roof');
const railsA = mark('dio-rail', [8.2, 8.8].map((y) => line([0.1, y, top + 0.01], [A.tower, y, top + 0.01])).join(''));
// The kerb of each platform, in the line's colour
const edges = mark('dio-edge', [7.75, 9.25].map((y) => line([A.sx0, y, top + 0.13], [A.sx1, y, top + 0.13])).join(''));
const lamps = [A.sx0 + 1, A.sx1 - 1].map((x) => mark('dio-post', line([x, 9.75, top + 0.12], [x, 9.75, 3.5])));
const sign = box(A.sx0 + 0.4, 9.72, 2.95, 1.2, 0.06, 0.45, 'roof');

/**
 * A train of `cars` boxes from `at` along the axis `dir` (x or y), with its
 * windows and a stripe in the line's colour on the side facing the viewer.
 */
function train(at: V, dir: 'x' | 'y', mat: string, cars: number, len: number, w: number, h: number) {
  const gap = 0.15;
  const shapes: Shape[] = [];
  let stripe = '';
  let win = '';
  for (let i = 0; i < cars; i++) {
    const u = i * (len + gap);
    const [x, y] = dir === 'x' ? [at[0] + u, at[1]] : [at[0], at[1] + u];
    const [dx, dy] = dir === 'x' ? [len, w] : [w, len];
    shapes.push(...box(x, y, at[2], dx, dy, h, mat));
    const side = (z: number, inset: number): [V, V] =>
      dir === 'x'
        ? [
            [x + inset, y + dy + 0.02, z],
            [x + dx - inset, y + dy + 0.02, z],
          ]
        : [
            [x + dx + 0.02, y + inset, z],
            [x + dx + 0.02, y + dy - inset, z],
          ];
    stripe += line(...side(at[2] + h * 0.32, 0.05));
    win += line(...side(at[2] + h * 0.68, 0.3));
  }
  return paths(shapes) + mark('dio-stripe', stripe) + mark('dio-car-windows', win);
}

const trainA = train([0, 7.95, top], 'x', 'roof', 2, 3, 1.1, 1.15);
const TA = { stop: A.sx0 + 0.4, hide: A.tower + 0.05 };

const tower = [
  ...box(A.tower, 6.6, 0, AX - A.tower, 3.6, 4.2, 'wall'),
  ...box(A.tower - 0.15, 6.45, 4.2, AX - A.tower + 0.15, 3.9, 0.3, 'roof'),
];
const towerWindows = mark('dio-windows', windows(A.tower, 6.6, AX - A.tower, 3.6, 4.2));

// Line B comes up from a tunnel near the front and ends at a terminus just
// in front of the viaduct.
const B = { x0: 15.4, x1: 16.8, y0: 9.6, portal: 13.4 };
const bed = box(B.x0, B.y0, 0, B.x1 - B.x0, AY - B.y0, 0.15, 'wall');
const railsB = mark('dio-rail', [15.8, 16.4].map((x) => line([x, B.y0 + 0.2, 0.16], [x, AY, 0.16])).join(''));
const buffer = box(15.6, B.y0 + 0.05, 0.15, 1, 0.2, 0.5, 'roof');
const platformB = box(B.x1, 9.8, 0, 1.3, B.portal - 9.8, 0.4, 'wall');
const edgeB = mark('dio-edge-b', line([B.x1 + 0.02, 9.8, 0.41], [B.x1 + 0.02, B.portal, 0.41]));
const TB = { start: B.portal + 0.15, stop: 9.95 };
const trainB = train([15.55, TB.start, 0.2], 'y', 'deep', 2, 1.6, 1.1, 1.05);
const portal = [
  ...box(B.x0 - 0.5, B.portal, 0, B.x1 - B.x0 + 1, AY - B.portal, 1.5, 'wall'),
  ...box(B.x0 - 0.6, B.portal - 0.1, 1.5, B.x1 - B.x0 + 1.2, AY - B.portal + 0.1, 0.2, 'roof'),
];

// Front of the block: low buildings on the left, trees on the right
const FRONT: Block[] = [
  [1.5, 11, 4, 4, 2.2, 'wall'],
  [7, 12, 3.6, 3.6, 1.4, 'wall'],
  [11.4, 11, 2.4, 2.4, 1.8, 'wall'],
];
const frontCity = city(FRONT);
const trees = paths(
  blocks([
    [19.5, 11.5, 1.1, 1.1, 1.6, 'soft'],
    [21.8, 12.2, 1.2, 1.2, 2, 'soft'],
    [20.2, 14.3, 1.1, 1.1, 1.4, 'soft'],
    [22.4, 15, 1, 1, 1.7, 'soft'],
  ])
);

// Arrival: a ring on the platform's level and two notes rising above it
function ring([cx, cy, z]: V, r: number) {
  return poly(
    Array.from({ length: 28 }, (_, k): V => {
      const a = (2 * Math.PI * k) / 28;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a), z];
    })
  );
}
/** A quaver in screen units, its head at (x, y). */
function note(x: number, y: number) {
  const h = `M${r1(x - 2.6)} ${r1(y)}a2.6 1.9 -20 1 0 5.2 0a2.6 1.9 -20 1 0 -5.2 0Z`;
  const stem = `M${r1(x + 2.2)} ${r1(y - 0.4)}V${r1(y - 11)}q2 3.5 5 5`;
  return `<path class="dio-note-head" d="${h}"/><path class="dio-note-stem" d="${stem}"/>`;
}
function arrival(name: string, at: V, r: number) {
  const [x, y] = proj([at[0], at[1], at[2] + 2.2]);
  return [
    mark(`dio-ping dio-ping-${name}`, ring(at, r)),
    `<g class="dio-notes dio-notes-${name}">${note(x - 6, y)}${note(x + 8, y - 6)}</g>`,
  ].join('');
}
const pingA = arrival('a', [(A.sx0 + A.sx1) / 2, 8.5, top + 0.02], 2.2);
const pingB = arrival('b', [16.1, 11.6, 0.2], 1.4);

const svg = [
  paths(slab(AX, AY)),
  backCity,
  paths(pillars),
  paths(deck),
  railsA,
  paths(platform(7)),
  ...farPosts,
  paths(canopy),
  `<g class="dio-train-a">${trainA}</g>`,
  paths(platform(9.25)),
  edges,
  ...lamps,
  paths(sign),
  frontCity,
  paths(bed),
  railsB,
  paths(buffer),
  `<g class="dio-train-b">${trainB}</g>`,
  paths(platformB),
  edgeB,
  paths(portal),
  paths(tower),
  towerWindows,
  trees,
  pingA,
  pingB,
  beacons([
    [AX - 0.6, 8.4, 4.6],
    [A.sx0 + 3, 9.75, 3.7],
    [B.x0 - 0.3, AY - 0.3, 1.8],
  ]),
].join('');

// One loop: line A arrives at 26%, line B at 66%. Each train stops, then
// leaves: A into the interchange building, B back down its tunnel.
const LOOP = '12s';
const at = (v: number, w = 0) => `translate(${shift(v, w)})`;
// In dark mode the scene keeps the light theme's accent: the pale dark-mode
// accent washed out against the lit volumes. Cosmos' dark accents sit about
// 0.17 lighter and 0.03 less chromatic than their light ones, so undo that.
// (--accent can't be redefined from itself on one element, hence --dio-a.)
// Accent faces then shade towards the scene's shade colour, as in light mode.
const darkRoof = [0, 9, 18, 30]
  .map(
    (k, t) => `:root[data-theme='dark'] .dio .roof${t}{--f:color-mix(in oklab, var(--accent), var(--dio-shade) ${k}%)}`
  )
  .join('');

const css = `
:root[data-theme='dark'] .dio { --dio-a: oklch(from var(--accent) calc(l - 0.17) calc(c + 0.03) h); }
:root[data-theme='dark'] .dio svg { --accent: var(--dio-a); }
${darkRoof}
/* Line B wears the same colour as its train (the 'deep' tone base in iso.ts). */
.dio { --dio-line-b: color-mix(in oklab, var(--ink) var(--dio-deep), var(--accent-3)); }
.dio .dio-rail { fill: none; stroke: var(--dio-body); stroke-width: 0.7; opacity: 0.7; }
.dio .dio-post { fill: none; stroke: var(--dio-wall); stroke-width: 1.2; }
.dio .dio-edge { fill: none; stroke: var(--accent); stroke-width: 1.4; }
.dio .dio-stripe { fill: none; stroke: var(--dio-void); stroke-width: 1; opacity: 0.35; }
.dio .dio-car-windows { fill: none; stroke: var(--dio-body); stroke-width: 2.4; stroke-linecap: round; stroke-dasharray: 0 4.5; }
.dio .dio-edge-b { fill: none; stroke: var(--dio-line-b); stroke-width: 1.4; }
.dio .dio-ping { fill: none; stroke: var(--accent); stroke-width: 1.6; opacity: 0; transform-box: fill-box; transform-origin: center; vector-effect: non-scaling-stroke; }
.dio .dio-ping-b { stroke: var(--dio-line-b); }
.dio .dio-notes { opacity: 0; }
.dio .dio-note-head { fill: var(--accent); stroke: none; }
.dio .dio-note-stem { fill: none; stroke: var(--accent); stroke-width: 1.2; stroke-linecap: round; }
.dio .dio-notes-b .dio-note-head { fill: var(--dio-line-b); }
.dio .dio-notes-b .dio-note-stem { stroke: var(--dio-line-b); }
.dio .dio-train-a { transform: ${at(TA.stop)}; }
.dio .dio-train-b { transform: ${at(0, TB.stop - TB.start)}; }
@media (prefers-reduced-motion: no-preference) {
  .dio .dio-train-a { animation: dio-train-a ${LOOP} infinite both; }
  .dio .dio-train-b { animation: dio-train-b ${LOOP} infinite both; }
  .dio .dio-ping-a { animation: dio-ping ${LOOP} -${r1(12 * 0.74)}s infinite both; }
  .dio .dio-notes-a { animation: dio-notes ${LOOP} -${r1(12 * 0.74)}s infinite both; }
  .dio .dio-ping-b { animation: dio-ping ${LOOP} -${r1(12 * 0.34)}s infinite both; }
  .dio .dio-notes-b { animation: dio-notes ${LOOP} -${r1(12 * 0.34)}s infinite both; }
}
@keyframes dio-train-a {
  0% { transform: none; opacity: 0; animation-timing-function: cubic-bezier(0.2, 0.6, 0.4, 1); }
  4% { opacity: 1; }
  26% { transform: ${at(TA.stop)}; animation-timing-function: linear; }
  40% { transform: ${at(TA.stop)}; animation-timing-function: cubic-bezier(0.5, 0, 0.8, 0.4); }
  70% { transform: ${at(TA.hide)}; opacity: 1; }
  71%, 100% { transform: ${at(TA.hide)}; opacity: 0; }
}
@keyframes dio-train-b {
  0%, 46% { transform: none; animation-timing-function: cubic-bezier(0.2, 0.6, 0.4, 1); }
  66% { transform: ${at(0, TB.stop - TB.start)}; animation-timing-function: linear; }
  80% { transform: ${at(0, TB.stop - TB.start)}; animation-timing-function: cubic-bezier(0.5, 0, 0.8, 0.4); }
  97%, 100% { transform: none; }
}
@keyframes dio-ping {
  0% { opacity: 0.9; transform: scale(0.25); animation-timing-function: ease-out; }
  12% { opacity: 0; transform: scale(1.6); }
  100% { opacity: 0; transform: scale(1.6); }
}
@keyframes dio-notes {
  0% { opacity: 0; transform: none; animation-timing-function: ease-out; }
  3% { opacity: 1; }
  18% { opacity: 0; transform: translateY(-14px); }
  100% { opacity: 0; transform: translateY(-14px); }
}`;

export const intervaloScene: Scene = { viewBox: viewBox(), svg, css };
