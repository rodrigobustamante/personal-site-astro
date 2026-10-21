/**
 * Madrid, the second half of the home's "From Santiago to Madrid": the Cuatro
 * Torres along the back, the leaning towers of Puerta de Europa and a runway
 * at the front. The loop (an airliner comes in from the left, the Santiago
 * side, and lands) is CSS only and sits behind prefers-reduced-motion; the
 * static frame is a complete scene on its own.
 */
import { createScene, type Block, type Scene, type V } from './iso';

const { poly, line, shift, face, box, solid, slab, plane, paths, mark, beacons, viewBox, city } = createScene();

const AX = 24;
const AY = 20;

/** A square tower of side `w` whose top is shifted by `lean` (screen-horizontal when dx = -dy). */
function leaning(x: number, y: number, w: number, h: number, [lx, ly]: [number, number], mat: string) {
  const ring = (z: number, ox: number, oy: number): V[] => [
    [x + ox, y + oy, z],
    [x + w + ox, y + oy, z],
    [x + w + ox, y + w + oy, z],
    [x + ox, y + w + oy, z],
  ];
  const [bottom, top] = [ring(0, 0, 0), ring(h, lx, ly)];
  const sides = bottom.map((p, i) => [p, bottom[(i + 1) % 4], top[(i + 1) % 4], top[i]]);
  return paths(solid([...sides, top], mat));
}

// Cuatro Torres, back row: Cepsa (open at the top), PwC, Cristal and Emperador
const CT = { y: 2.4, d: 1.6 };
const cepsa = { x: 3, w: 2.4, h: 8 };
const cepsaSvg = [
  paths(box(cepsa.x, CT.y, 0, 0.6, CT.d, cepsa.h, 'wall')),
  paths(box(cepsa.x + 0.6, CT.y, 0, cepsa.w - 1.2, CT.d, 6.3, 'wall')),
  paths(box(cepsa.x + cepsa.w - 0.6, CT.y, 0, 0.6, CT.d, cepsa.h, 'wall')),
  paths(box(cepsa.x + 0.6, CT.y, cepsa.h - 0.7, cepsa.w - 1.2, CT.d, 0.7, 'wall')),
].join('');
const pwc = [
  paths(box(7, CT.y, 0, 1.6, CT.d, 7.2, 'wall')),
  paths(box(6.85, CT.y - 0.15, 7.2, 1.9, CT.d + 0.3, 0.5, 'roof')),
].join('');
// Torre de Cristal: a glass box with a slanted top
const cr = { x: 10.2, w: 1.7, h0: 7.4, h1: 8.4 };
const cristal = paths(
  solid(
    [
      [
        [cr.x + cr.w, CT.y, 0],
        [cr.x + cr.w, CT.y + CT.d, 0],
        [cr.x + cr.w, CT.y + CT.d, cr.h0],
        [cr.x + cr.w, CT.y, cr.h0],
      ],
      [
        [cr.x, CT.y + CT.d, 0],
        [cr.x + cr.w, CT.y + CT.d, 0],
        [cr.x + cr.w, CT.y + CT.d, cr.h0],
        [cr.x, CT.y + CT.d, cr.h1],
      ],
      [
        [cr.x, CT.y, cr.h1],
        [cr.x + cr.w, CT.y, cr.h0],
        [cr.x + cr.w, CT.y + CT.d, cr.h0],
        [cr.x, CT.y + CT.d, cr.h1],
      ],
      [
        [cr.x, CT.y, 0],
        [cr.x, CT.y + CT.d, 0],
        [cr.x, CT.y + CT.d, cr.h1],
        [cr.x, CT.y, cr.h1],
      ],
    ],
    'roof'
  )
);
const emperador = [
  paths(box(13.4, CT.y, 0, 1.6, CT.d, 6.6, 'wall')),
  paths(box(13.6, CT.y + 0.2, 6.6, 1.2, CT.d - 0.4, 0.9, 'wall')),
].join('');
const cuatroTorres = cepsaSvg + pwc + cristal + emperador;

// Puerta de Europa: two towers leaning towards each other across the avenue
const K = { w: 1.5, h: 6.2, lean: 0.9 };
const kioA = leaning(13.6, 9.4, K.w, K.h, [K.lean, -K.lean], 'soft');
const kioB = leaning(17.1, 5.9, K.w, K.h, [-K.lean, K.lean], 'soft');

// Low blocks of the city around them
const BLOCKS: Block[] = [
  [17, 2.6, 2.4, 2, 2.4, 'wall'],
  [20.4, 2.8, 2.2, 2.2, 1.6, 'wall'],
  [3.4, 6.6, 2.4, 2.2, 2.2, 'wall'],
  [6.8, 6.4, 2.2, 2.4, 1.6, 'wall'],
  [9.8, 6.8, 2, 2, 2.6, 'wall'],
  [20.2, 7, 2.4, 2.2, 2.2, 'wall'],
  [4.4, 9.6, 2.4, 1.8, 1.4, 'wall'],
  [19.4, 10.6, 2.6, 2, 1.6, 'wall'],
];
// Barajas T4 by the runway: a glass hall under a wavy roof held up by
// pillars in a run of colours
const T4 = { x0: 1.6, x1: 11, y0: 11.4, y1: 13.4, h: 1.2 };
const wave = (x: number) => 1.75 + 0.3 * Math.sin(((x - T4.x0) / (T4.x1 - T4.x0)) * Math.PI * 3);
const stations = Array.from({ length: 25 }, (_, i) => T4.x0 - 0.3 + (i * (T4.x1 - T4.x0 + 0.6)) / 24);
const roofT4 = stations.slice(0, -1).flatMap((xa, i) => {
  const xb = stations[i + 1];
  return face(
    [
      [xa, T4.y0 - 0.4, wave(xa)],
      [xb, T4.y0 - 0.4, wave(xb)],
      [xb, T4.y1 + 0.4, wave(xb)],
      [xa, T4.y1 + 0.4, wave(xa)],
    ],
    'roof',
    [xa, (T4.y0 + T4.y1) / 2, 0]
  );
});
const PILLARS = ['dio-p0', 'dio-p1', 'dio-p2'];
const pillarsT4 = stations
  .filter((_, i) => i % 3 === 1)
  .map((x, i) => mark(PILLARS[i % 3], line([x, T4.y1 + 0.3, 0], [x, T4.y1 + 0.3, wave(x) - 0.05])))
  .join('');
const terminal =
  paths(box(T4.x0, T4.y0, 0, T4.x1 - T4.x0, T4.y1 - T4.y0, T4.h, 'wall')) +
  mark('dio-glass', line([T4.x0 + 0.2, T4.y1 + 0.02, 0.6], [T4.x1 - 0.2, T4.y1 + 0.02, 0.6])) +
  paths(roofT4) +
  pillarsT4;

// Landmarks and blocks share one painter's order
const scenery = [
  ...BLOCKS.map((b) => ({ key: b[0] + b[1], svg: city([b]) })),
  { key: 13.6 + 9.4 + 0.1, svg: kioA },
  { key: (T4.x0 + T4.x1) / 2 + T4.y0, svg: terminal },
  { key: 17.1 + 5.9, svg: kioB },
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

// The airliner, rolled out past the middle in the static frame
const jet = plane({ ox: 3, yc: RC, s: 0.6 });

const svg = [
  paths(slab(AX, AY)),
  cuatroTorres,
  scenery,
  runway,
  centreline,
  `<g class="dio-jet-shadow dio-sync">${jet.shadow}</g>`,
  `<g class="dio-jet dio-sync">${jet.body}</g>`,
  beacons([
    [3.3, CT.y + CT.d / 2, cepsa.h + 0.1],
    [cr.x, CT.y + CT.d / 2, cr.h1 + 0.1],
  ]),
].join('');

// Same 16 s loop as the Santiago scene, half a cycle later: the plane comes
// in high from the left, flares, touches down and rolls out.
const css = `
.dio .dio-glass { fill: none; stroke: var(--dio-void); stroke-width: 1; stroke-dasharray: 0 4; stroke-linecap: round; opacity: 0.5; }
.dio .dio-p0, .dio .dio-p1, .dio .dio-p2 { fill: none; stroke-width: 1.6; stroke-linecap: round; }
.dio .dio-p0 { stroke: var(--accent); }
.dio .dio-p1 { stroke: var(--accent-2); }
.dio .dio-p2 { stroke: var(--accent-3); }
.dio .dio-runway { fill: color-mix(in oklab, var(--dio-void), var(--paper) 18%); }
.dio .dio-centreline { fill: none; stroke: var(--dio-body); stroke-width: 1.2; stroke-dasharray: 8 7; opacity: 0.7; }
@media (prefers-reduced-motion: no-preference) {
  .dio .dio-jet, .dio .dio-jet-shadow { animation: 16s infinite both; animation-delay: var(--dio-t, 0s); }
  .dio .dio-jet { animation-name: dio-landing; }
  .dio .dio-jet-shadow { animation-name: dio-landing-shadow; }
}
@keyframes dio-landing {
  0%, 44% { transform: translate(${shift(-18, 0, 8)}); opacity: 0; animation-timing-function: linear; }
  48% { opacity: 1; }
  68% { transform: translate(${shift(-7, 0, 1)}); animation-timing-function: ease-out; }
  72% { transform: translate(${shift(-5)}); animation-timing-function: cubic-bezier(0.2, 0.6, 0.4, 1); }
  88% { transform: none; opacity: 1; }
  96%, 100% { transform: none; opacity: 0; }
}
@keyframes dio-landing-shadow {
  0%, 60% { transform: translate(${shift(-10)}); opacity: 0; animation-timing-function: linear; }
  68% { transform: translate(${shift(-7)}); opacity: 1; animation-timing-function: ease-out; }
  72% { transform: translate(${shift(-5)}); animation-timing-function: cubic-bezier(0.2, 0.6, 0.4, 1); }
  88% { transform: none; opacity: 1; }
  96%, 100% { transform: none; opacity: 0; }
}`;

export const madridScene: Scene = { viewBox: viewBox(), svg, css };
