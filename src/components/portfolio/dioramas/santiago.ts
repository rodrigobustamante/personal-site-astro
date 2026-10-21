/**
 * Santiago, the first half of the home's "From Santiago to Madrid": the Andes
 * along the back, the city with the Gran Torre and the Entel tower, and a
 * runway at the front. The loop (an airliner rolls down the runway and climbs
 * out to the right, towards the Madrid scene) is CSS only and sits behind
 * prefers-reduced-motion; the static frame is a complete scene on its own.
 */
import { createScene, tones, type Block, type Scene, type V } from './iso';

const { poly, line, shift, box, solid, slab, plane, paths, mark, beacons, viewBox, city } = createScene();

const AX = 24;
const AY = 20;

/** A four-sided peak over a square base, with its top `snow` fraction capped. */
function peak(cx: number, cy: number, r: number, h: number, snow = 0.34) {
  const apex: V = [cx, cy, h];
  const base: V[] = [
    [cx - r, cy - r, 0],
    [cx + r, cy - r, 0],
    [cx + r, cy + r, 0],
    [cx - r, cy + r, 0],
  ];
  const sides = (ring: V[]) => ring.map((p, i) => [p, ring[(i + 1) % 4], apex]);
  const cap = base.map(([x, y, z]): V => [cx + (x - cx) * snow, cy + (y - cy) * snow, h - (h - z) * snow]);
  return paths(solid(sides(base), 'rock')) + paths(solid([...sides(cap), cap], 'snow'));
}

// The cordillera along both back edges, highest at the far corner
const PEAKS: [number, number, number, number][] = [
  [3.3, 3.3, 3.2, 6.6],
  [8.6, 3, 2.8, 5.4],
  [13.4, 3.1, 3, 6.2],
  [18.4, 2.8, 2.6, 4.8],
  [21.6, 2.4, 2.4, 5.4],
  [2.6, 8, 2.6, 5],
  [2.2, 11.6, 2.2, 3.8],
];
const andes = PEAKS.slice()
  .sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
  .map(([x, y, r, h]) => peak(x, y, r, h))
  .join('');

// San Cristóbal hill: a low, rounded cone with the statue on its summit
const hill = { x: 6.5, y: 9.5, r: 2.6, h: 2.2 };
const ringAt = (r: number, z: number) =>
  Array.from({ length: 10 }, (_, k): V => {
    const a = (2 * Math.PI * (k + 0.5)) / 10;
    return [hill.x + r * Math.cos(a), hill.y + r * Math.sin(a), z];
  });
const [foot, shoulder, summit] = [ringAt(hill.r, 0), ringAt(hill.r * 0.55, hill.h * 0.8), ringAt(0.5, hill.h)];
const band = (lo: V[], hi: V[]) => lo.map((p, i) => [p, lo[(i + 1) % 10], hi[(i + 1) % 10], hi[i]]);
const hillShape = paths(solid([...band(foot, shoulder), ...band(shoulder, summit), summit], 'soft'));
const statue = mark('dio-statue', line([hill.x, hill.y, hill.h], [hill.x, hill.y, hill.h + 0.6]));

// Gran Torre Santiago: a tall glass box with an open crown on top
const T = { x: 12, y: 8, w: 1.7, h: 8.4, crown: 1 };
const tower = paths(box(T.x, T.y, 0, T.w, T.w, T.h, 'roof'));
const crownTop = T.h + T.crown;
const crown = mark(
  'dio-crown',
  (
    [
      [T.x + T.w, T.y],
      [T.x + T.w, T.y + T.w],
      [T.x, T.y + T.w],
    ] as [number, number][]
  )
    .map(([x, y]) => line([x, y, T.h], [x + (T.x + T.w / 2 - x) * 0.35, y + (T.y + T.w / 2 - y) * 0.35, crownTop]))
    .join('')
);
const towerLines = mark(
  'dio-mullions',
  [2, 4, 6].map((z) => line([T.x + T.w + 0.02, T.y, z], [T.x + T.w + 0.02, T.y + T.w, z])).join('') +
    [2, 4, 6].map((z) => line([T.x, T.y + T.w + 0.02, z], [T.x + T.w, T.y + T.w + 0.02, z])).join('')
);

// Torre Entel: a shaft with two dishes and a mast
const E = { x: 16.6, y: 9.6, w: 0.6, h: 4.6 };
const entel = [
  paths(box(E.x, E.y, 0, E.w, E.w, E.h, 'wall')),
  paths(box(E.x - 0.35, E.y - 0.35, 3.4, E.w + 0.7, E.w + 0.7, 0.3, 'wall')),
  paths(box(E.x - 0.2, E.y - 0.2, 4, E.w + 0.4, E.w + 0.4, 0.25, 'wall')),
  mark('dio-statue', line([E.x + E.w / 2, E.y + E.w / 2, E.h], [E.x + E.w / 2, E.y + E.w / 2, E.h + 1.4])),
];

// Blocks around the landmarks, back to front
const BLOCKS: Block[] = [
  [9.6, 6.6, 1.8, 2, 2, 'wall'],
  [14.2, 6.4, 2.2, 1.8, 2.6, 'wall'],
  [18.6, 6.6, 2.4, 2.2, 1.8, 'wall'],
  [9.4, 10.4, 2.2, 2, 1.6, 'wall'],
  [13.8, 10.6, 2, 1.8, 2.2, 'wall'],
  [18.6, 10.4, 2.6, 2.2, 2.6, 'wall'],
  [21.4, 7, 1.8, 2, 1.4, 'wall'],
];
// Landmarks and blocks share one painter's order
const scenery = [
  ...BLOCKS.map((b) => ({ key: b[0] + b[1], svg: city([b]) })),
  { key: hill.x + hill.y, svg: hillShape + statue },
  { key: T.x + T.y + 0.5, svg: tower + towerLines + crown },
  { key: E.x + E.y, svg: entel.join('') },
]
  .sort((a, b) => a.key - b.key)
  .map((s) => s.svg)
  .join('');

// Runway along x at the front edge
const R = { x0: 0.8, x1: AX - 0.8, y0: 14.6, y1: 18.6 };
const runway = mark(
  'dio-runway',
  poly([
    [R.x0, R.y0, 0],
    [R.x1, R.y0, 0],
    [R.x1, R.y1, 0],
    [R.x0, R.y1, 0],
  ])
);
const RC = (R.y0 + R.y1) / 2;
const centreline = mark('dio-centreline', line([R.x0 + 1, RC, 0], [R.x1 - 1, RC, 0]));

// The airliner, mid-roll in the static frame
const S = 0.6;
const jet = plane({ ox: -2.4, yc: RC, s: S });

const svg = [
  paths(slab(AX, AY)),
  andes,
  scenery,
  runway,
  centreline,
  `<g class="dio-jet-shadow dio-sync">${jet.shadow}</g>`,
  `<g class="dio-jet dio-sync">${jet.body}</g>`,
  beacons([
    [T.x + T.w / 2, T.y + T.w / 2, crownTop + 0.1],
    [E.x + E.w / 2, E.y + E.w / 2, E.h + 1.5],
  ]),
].join('');

// The roll starts at the threshold and the climb ends past the right edge;
// the timing is shared with the Madrid scene, whose plane arrives as this one
// leaves (both run off --dio-t, see Diorama.astro).
const css = `
${tones('rock', 'var(--dio-rock)')}${tones('snow', 'var(--dio-snow)')}
.dio { --dio-rock: color-mix(in oklab, var(--ink) 55%, var(--accent-3)); --dio-snow: var(--card); }
:root[data-theme='dark'] .dio { --dio-rock: color-mix(in oklab, var(--accent-3) 30%, var(--card)); --dio-snow: color-mix(in oklab, var(--ink) 88%, var(--card)); }
.dio .dio-runway { fill: color-mix(in oklab, var(--dio-void), var(--paper) 18%); }
.dio .dio-centreline { fill: none; stroke: var(--dio-body); stroke-width: 1.2; stroke-dasharray: 8 7; opacity: 0.7; }
.dio .dio-statue, .dio .dio-crown, .dio .dio-mullions { fill: none; stroke: var(--dio-body); stroke-width: 1.2; stroke-linecap: round; }
.dio .dio-crown { stroke: var(--accent); stroke-width: 1.4; }
.dio .dio-mullions { stroke: var(--dio-void); stroke-width: 0.7; opacity: 0.35; }
@media (prefers-reduced-motion: no-preference) {
  .dio .dio-jet, .dio .dio-jet-shadow { animation: 16s infinite both; animation-delay: var(--dio-t, 0s); }
  .dio .dio-jet { animation-name: dio-takeoff; }
  .dio .dio-jet-shadow { animation-name: dio-takeoff-shadow; }
}
@keyframes dio-takeoff {
  0% { transform: translate(${shift(-3)}); opacity: 0; animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6); }
  5% { opacity: 1; }
  24% { transform: translate(${shift(5)}); animation-timing-function: cubic-bezier(0.3, 0.2, 0.6, 1); }
  40% { transform: translate(${shift(13, 0, 7)}); opacity: 1; }
  44%, 100% { transform: translate(${shift(15, 0, 8.5)}); opacity: 0; }
}
@keyframes dio-takeoff-shadow {
  0% { transform: translate(${shift(-3)}); opacity: 0; animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6); }
  5% { opacity: 1; }
  24% { transform: translate(${shift(5)}); opacity: 1; animation-timing-function: linear; }
  32%, 100% { transform: translate(${shift(9)}); opacity: 0; }
}`;

export const santiagoScene: Scene = { viewBox: viewBox(), svg, css };
