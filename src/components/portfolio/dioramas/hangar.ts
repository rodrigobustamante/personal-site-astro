/**
 * Hangar case study header: a hangar holding the component library, with an
 * airliner on the apron. The loop (a cart delivering components into the
 * hangar) is CSS only and sits behind prefers-reduced-motion; the static frame
 * is a complete scene on its own.
 */
import { createScene, type Scene, type V } from './iso';

const { poly, line, shift, face, box, slab, plane, paths, mark, beacons, viewBox } = createScene();

const AX = 24;
const AY = 19.5;

// Hangar: barrel roof spanning y, open towards +x
const H = { x0: 1, x1: 9, y0: 1, y1: 10, h: 3.2, rise: 2.2 };
const hyc = (H.y0 + H.y1) / 2;
const hr = (H.y1 - H.y0) / 2;
const ARC = 12;
const arcPts = Array.from({ length: ARC + 1 }, (_, i): [number, number] => {
  const t = (Math.PI * i) / ARC;
  return [hyc + hr * Math.cos(t), H.h + H.rise * Math.sin(t)];
});
const hMid: V = [(H.x0 + H.x1) / 2, hyc, H.h / 2];
const hangar = [
  ...face(
    [
      [H.x0, H.y1, 0],
      [H.x1, H.y1, 0],
      [H.x1, H.y1, H.h],
      [H.x0, H.y1, H.h],
    ],
    'wall',
    hMid
  ),
  ...arcPts.slice(0, -1).flatMap(([ya, za], i) => {
    const [yb, zb] = arcPts[i + 1];
    return face(
      [
        [H.x0, ya, za],
        [H.x1, ya, za],
        [H.x1, yb, zb],
        [H.x0, yb, zb],
      ],
      'roof',
      [hMid[0], hyc, H.h - 1]
    );
  }),
  ...face([[H.x1, H.y0, 0], [H.x1, H.y1, 0], ...arcPts.map(([y, z]): V => [H.x1, y, z])], 'wall', hMid),
];
const D = { y0: 2, y1: 9, h: 4 };
const doorPath = poly([
  [H.x1, D.y0, 0],
  [H.x1, D.y1, 0],
  [H.x1, D.y1, D.h],
  [H.x1, D.y0, D.h],
]);
const floor = poly([
  [H.x0, H.y0, 0],
  [H.x1, H.y0, 0],
  [H.x1, H.y1, 0],
  [H.x0, H.y1, 0],
]);
const side = poly([
  [H.x0, H.y0, 0],
  [H.x1, H.y0, 0],
  [H.x1, H.y0, H.h],
  [H.x0, H.y0, H.h],
]);
// The component library already on the floor, and the slots the cart fills.
const MATS = ['roof', 'soft', 'deep'];
const library = [2.4, 3.3, 6.1, 7.0, 7.9].map((y, i) => box(6.2, y, 0, 0.8, 0.8, 0.8, MATS[(i + 1) % 3]));
const delivered = [3.6, 4.5, 5.4].map((y, i) => box(7.4, y, 0, 0.8, 0.8, 0.8, MATS[i]));

// Cart, parked mid-lane in the static frame
const LANE = 4.5;
const CX = 15.5;
const cart = [
  ...box(CX, LANE - 0.45, 0.15, 1.1, 0.9, 0.6, 'roof'),
  ...box(CX + 0.25, LANE - 0.3, 0.75, 0.5, 0.6, 0.35, 'deep'),
  ...box(CX + 1.3, LANE - 0.5, 0.15, 2.1, 1, 0.2, 'wall'),
  ...MATS.flatMap((m, i) => box(CX + 1.4 + i * 0.65, LANE - 0.27, 0.35, 0.55, 0.55, 0.55, m)),
];
const cartShadow = poly([
  [CX - 0.1, LANE - 0.6, 0],
  [CX + 3.5, LANE - 0.6, 0],
  [CX + 3.5, LANE + 0.6, 0],
  [CX - 0.1, LANE + 0.6, 0],
]);

// Airliner on its stand, nose towards +x
const yc = 13.5;
const airliner = plane({ yc });

const svg = [
  `<defs><clipPath id="dio-hangar-door"><path d="${doorPath}"/></clipPath></defs>`,
  paths(slab(AX, AY)),
  mark('dio-lane', line([H.x1 + 0.2, LANE, 0], [AX - 0.4, LANE, 0])),
  mark('dio-stand', line([H.x1 + 1.2, yc, 0], [AX - 0.4, yc, 0])),
  mark('dio-stand', line([23, yc - 1.2, 0], [23, yc + 1.2, 0])),
  paths(hangar),
  mark('dio-void', doorPath),
  '<g clip-path="url(#dio-hangar-door)">',
  mark('dio-void-floor', floor),
  mark('dio-void-side', side),
  ...library.map((b) => `<g>${paths(b)}</g>`),
  ...delivered.map((b, i) => `<g class="dio-drop" style="--i:${i}">${paths(b)}</g>`),
  '</g>',
  `<g class="dio-cart" style="--from:${shift(22 - CX)};--to:${shift(9.6 - CX)}">`,
  mark('dio-shadow', cartShadow),
  paths(cart),
  '</g>',
  airliner.shadow,
  airliner.body,
  beacons([[H.x1, hyc, H.h + H.rise + 0.15], ...airliner.beacons]),
].join('');

// The cart rolls in from the apron edge, enters the hangar and fades; its load
// then drops into the free slots of the library, and clears before the next run.
const css = `
.dio .dio-void-floor { fill: color-mix(in oklab, var(--dio-void), var(--paper) 14%); }
.dio .dio-void-side { fill: color-mix(in oklab, var(--dio-void), var(--paper) 6%); }
@media (prefers-reduced-motion: no-preference) {
  .dio .dio-cart { animation: dio-cart 12s cubic-bezier(0.45, 0, 0.4, 1) infinite both; }
  .dio .dio-drop {
    animation: dio-drop 12s cubic-bezier(0.3, 1.4, 0.5, 1) infinite both;
    animation-delay: calc(var(--i) * 0.35s);
  }
}
@keyframes dio-cart {
  0% { transform: translate(var(--from)); opacity: 0; }
  6% { opacity: 1; }
  44% { transform: translate(var(--to)); opacity: 1; }
  49%, 100% { transform: translate(var(--to)); opacity: 0; }
}
@keyframes dio-drop {
  0%, 48% { transform: translateY(-12px); opacity: 0; }
  54%, 90% { transform: none; opacity: 1; }
  95%, 100% { transform: none; opacity: 0; }
}`;

export const hangarScene: Scene = { viewBox: viewBox(), svg, css };
