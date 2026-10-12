/**
 * Supplier platform case study header: an open-pit copper mine with its
 * concentrator, and the supply road in front. The loop (ore climbing the
 * conveyor, and a supplier truck let through the access gate into the
 * warehouse) is CSS only and sits behind prefers-reduced-motion; the static
 * frame is a complete scene on its own.
 */
import { createScene, type Scene, type Shape, type V } from './iso';

const { poly, line, shift, face, box, slab, paths, mark, beacons, viewBox } = createScene();

const AX = 24;
const AY = 19.5;

// Open pit: benches stepping down and in, seen through the rim
const P = { x0: 1, x1: 11.5, y0: 1, y1: 11, step: 1.15, drop: 0.95, levels: 4 };
const rim = poly([
  [P.x0, P.y0, 0],
  [P.x1, P.y0, 0],
  [P.x1, P.y1, 0],
  [P.x0, P.y1, 0],
]);
const inset = (k: number) => ({
  x0: P.x0 + k * P.step,
  x1: P.x1 - k * P.step,
  y0: P.y0 + k * P.step,
  y1: P.y1 - k * P.step,
});
/** One bench: the floor ring at depth k and the far walls dropping to the next. */
function bench(k: number): Shape[] {
  const o = inset(k);
  const i = inset(k + 1);
  const [z, zn] = [-k * P.drop, -(k + 1) * P.drop];
  const mat = `pit${k}-`;
  const floor = (pts: V[]) => face(pts, mat, [pts[0][0], pts[0][1], z - 1]);
  if (k === P.levels)
    return floor([
      [o.x0, o.y0, z],
      [o.x1, o.y0, z],
      [o.x1, o.y1, z],
      [o.x0, o.y1, z],
    ]);
  const [cx, cy] = [(i.x0 + i.x1) / 2, (i.y0 + i.y1) / 2];
  return [
    // far strips and walls, then near strips, so near benches overlap deeper ones
    ...floor([
      [o.x0, o.y0, z],
      [o.x1, o.y0, z],
      [i.x1, i.y0, z],
      [i.x0, i.y0, z],
    ]),
    ...floor([
      [o.x0, o.y0, z],
      [i.x0, i.y0, z],
      [i.x0, i.y1, z],
      [o.x0, o.y1, z],
    ]),
    ...face(
      [
        [i.x0, i.y0, z],
        [i.x1, i.y0, z],
        [i.x1, i.y0, zn],
        [i.x0, i.y0, zn],
      ],
      mat,
      [cx, i.y0 - 1, z]
    ),
    ...face(
      [
        [i.x0, i.y0, z],
        [i.x0, i.y1, z],
        [i.x0, i.y1, zn],
        [i.x0, i.y0, zn],
      ],
      mat,
      [i.x0 - 1, cy, z]
    ),
    ...floor([
      [i.x1, i.y0, z],
      [o.x1, o.y0, z],
      [o.x1, o.y1, z],
      [i.x1, i.y1, z],
    ]),
    ...floor([
      [i.x0, i.y1, z],
      [i.x1, i.y1, z],
      [o.x1, o.y1, z],
      [o.x0, o.y1, z],
    ]),
  ];
}
// Deepest first. Each bench has its own material: the ground tones, darkened
// towards --dio-void a little more at every level.
const pit = Array.from({ length: P.levels }, (_, n) => paths(bench(P.levels - n)));
const pitCss = Array.from({ length: P.levels * 4 }, (_, n) => {
  const [k, t] = [Math.floor(n / 4) + 1, n % 4];
  return `.dio .pit${k}-${t}{--f:color-mix(in oklab, color-mix(in oklab, var(--paper-2), var(--ink) var(--dio-k${t})), var(--dio-void) ${k * 7}%)}`;
}).join('');

// Concentrator, back right, with its stack
const C = { x0: 14, x1: 20, y0: 1, y1: 5.5, h: 3.4 };
const plant = [
  ...box(C.x0, C.y0, 0, C.x1 - C.x0, C.y1 - C.y0, C.h, 'wall'),
  ...box(C.x0 - 0.1, C.y0 - 0.1, C.h, C.x1 - C.x0 + 0.2, C.y1 - C.y0 + 0.2, 0.3, 'roof'),
  ...box(18.4, 1.6, C.h + 0.3, 0.7, 0.7, 2.2, 'deep'),
];
const intake = poly([
  [16.1, C.y1, 2.2],
  [16.9, C.y1, 2.2],
  [16.9, C.y1, 3],
  [16.1, C.y1, 3],
]);

// Conveyor from the hopper up into the plant, rising towards -y
const BX = 16.5;
const B = { y0: 10.2, z0: 0.9, y1: C.y1 + 0.05, z1: 2.5, w: 0.4 };
const hopper = box(BX - 0.7, 10, 0, 1.4, 1.2, 0.9, 'soft');
const belt = face(
  [
    [BX - B.w, B.y0, B.z0],
    [BX + B.w, B.y0, B.z0],
    [BX + B.w, B.y1, B.z1],
    [BX - B.w, B.y1, B.z1],
  ],
  'deep',
  [BX, 8, 0]
);
const beltZ = (y: number) => B.z0 + ((B.y0 - y) / (B.y0 - B.y1)) * (B.z1 - B.z0);
const legs = [8.6, 7].map((y) => mark('dio-leg', line([BX + B.w, y, beltZ(y)], [BX + B.w, y, 0])));
const ORE = 0.42;
const [oy0, oy1] = [B.y0 - 0.7, B.y1 + 0.1];
const ore = [0, 1, 2].map(
  (i) =>
    `<g class="dio-ore" style="--i:${i};--climb:${shift(0, oy1 - oy0, beltZ(oy1) - beltZ(oy0))}">${paths(
      box(BX - ORE / 2, oy0, beltZ(oy0 + ORE / 2), ORE, ORE, ORE, 'roof')
    )}</g>`
);

/**
 * A truck along the x axis, its cab towards -x or, with `back`, towards +x.
 * `cargo` is a box van, or a dump body left open at the rear with a load of ore.
 */
function truck(x: number, y: number, cargo: 'van' | 'dump', back = false) {
  const [w, y0] = [1.2, y - 0.6];
  // u runs from the cab end (0) to the rear (3.5); X maps it to a box's lowest x
  const X = (u: number, len: number) => (back ? x + 3.5 - u - len : x + u);
  const wheels = (yy: number) => [0.35, 2.55].flatMap((u) => box(X(u, 0.6), yy, 0, 0.6, 0.25, 0.6, 'deep'));
  const cab = box(X(0, 1), y0, 0.55, 1, w, 1.05, cargo === 'van' ? 'roof' : 'body');
  const load =
    cargo === 'van'
      ? box(X(1.15, 2.3), y0, 0.55, 2.3, w, 1.5, 'body')
      : [
          ...box(X(1.1, 2.4), y0 - 0.05, 0.55, 2.4, w + 0.1, 0.25, 'roof'),
          ...box(X(1.1, 0.15), y0 - 0.05, 0.8, 0.15, w + 0.1, 0.7, 'roof'),
          ...box(X(1.1, 2.4), y0 - 0.05, 0.8, 2.4, 0.15, 0.7, 'roof'),
          ...[0, 1, 2].flatMap((i) =>
            box(X(2.2 + (i % 2) * 0.5, 0.45), y0 + 0.2 + i * 0.25, 0.8, 0.45, 0.45, 0.45, 'soft')
          ),
          ...box(X(1.1, 2.4), y0 + w - 0.1, 0.8, 2.4, 0.15, 0.7, 'roof'),
        ];
  // Painter's order: whichever end is further from the viewer (lower x) first
  const shapes = [
    ...wheels(y0),
    ...box(x, y0, 0.3, 3.5, w, 0.25, 'deep'),
    ...(back ? [...load, ...cab] : [...cab, ...load]),
    ...wheels(y0 + w - 0.25),
  ];
  const gx = X(0.12, 0.73);
  const glass = mark(
    'dio-cockpit',
    poly([
      [gx, y0 + w + 0.01, 1.05],
      [gx + 0.73, y0 + w + 0.01, 1.05],
      [gx + 0.73, y0 + w + 0.01, 1.45],
      [gx, y0 + w + 0.01, 1.45],
    ])
  );
  const shadow = mark(
    'dio-shadow',
    poly([
      [x - 0.1, y0 - 0.15, 0],
      [x + 3.7, y0 - 0.15, 0],
      [x + 3.7, y0 + w + 0.15, 0],
      [x - 0.1, y0 + w + 0.15, 0],
    ])
  );
  return { markup: shadow + paths(shapes) + glass, top: [X(0.5, 0), y, 1.7] as V };
}

// Haul truck backed up to the hopper, its open dump body over the conveyor's feed
const haul = truck(BX + 0.8, 10.6, 'dump', true);

// Supply road, gate and warehouse in front
const RY = 15.6;
const W = { x0: 1, x1: 6.5, y0: 13, y1: 18.2, h: 2.6 };
const warehouse = [
  ...box(W.x0, W.y0, 0, W.x1 - W.x0, W.y1 - W.y0, W.h, 'wall'),
  ...box(W.x0 - 0.1, W.y0 - 0.1, W.h, W.x1 - W.x0 + 0.2, W.y1 - W.y0 + 0.2, 0.25, 'roof'),
];
const door = poly([
  [W.x1, RY - 1, 0],
  [W.x1, RY + 1, 0],
  [W.x1, RY + 1, 2],
  [W.x1, RY - 1, 2],
]);
const road = poly([
  [W.x1, RY - 1.1, 0],
  [AX, RY - 1.1, 0],
  [AX, RY + 1.1, 0],
  [W.x1, RY + 1.1, 0],
]);

// The supplier's truck waits at the gate in the static frame
const GX = 10.2;
const SX = GX + 0.5;
const supplier = truck(SX, RY, 'van');
const post = box(GX - 0.2, RY + 1.3, 0, 0.4, 0.4, 1.1, 'wall');
const armDown = mark('dio-arm dio-arm-down', line([GX, RY + 1.3, 0.95], [GX, RY - 1.3, 0.95]));
const armUp = mark('dio-arm dio-arm-up', line([GX, RY + 1.5, 1.1], [GX, RY + 1.5, 3.6]));

const svg = [
  `<defs><clipPath id="dio-mine-pit"><path d="${rim}"/></clipPath></defs>`,
  paths(slab(AX, AY)),
  `<g clip-path="url(#dio-mine-pit)">${pit.join('')}</g>`,
  paths(plant),
  mark('dio-void', intake),
  paths(hopper),
  ...legs,
  paths(belt),
  ...ore,
  haul.markup,
  mark('dio-road', road),
  mark('dio-lane', line([W.x1 + 0.4, RY, 0], [AX - 0.4, RY, 0])),
  paths(warehouse),
  mark('dio-void', door),
  armDown,
  `<g class="dio-truck" style="--from:${shift(AX - 0.5 - SX)};--to:${shift(W.x1 + 0.2 - SX)}">${supplier.markup}</g>`,
  paths(post),
  armUp,
  beacons([[18.75, 1.95, C.h + 2.65], haul.top, [GX, RY + 1.5, 1.25]]),
].join('');

// Ore rides the belt into the plant; meanwhile the supplier's truck pulls up
// to the gate, the arm lifts, and the truck drives into the warehouse.
const css = `${pitCss}
.dio .dio-road { fill: color-mix(in oklab, var(--dio-void) 20%, var(--paper-2)); }
.dio .dio-leg { fill: none; stroke: var(--dio-wall); stroke-width: 1.2; }
.dio .dio-arm { fill: none; stroke: var(--accent); stroke-width: 2.2; stroke-linecap: round; }
.dio .dio-arm-up { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .dio .dio-ore {
    animation: dio-ore 6s linear infinite both;
    animation-delay: calc(var(--i) * -2s);
  }
  .dio .dio-truck { animation: dio-truck 12s ease-in-out infinite both; }
  .dio .dio-arm-down { animation: dio-gate 12s steps(1) infinite both; }
  .dio .dio-arm-up { animation: dio-gate-up 12s steps(1) infinite both; }
}
@keyframes dio-ore {
  0% { transform: none; opacity: 0; }
  8%, 88% { opacity: 1; }
  100% { transform: translate(var(--climb)); opacity: 0; }
}
@keyframes dio-truck {
  0% { transform: translate(var(--from)); opacity: 0; }
  6% { opacity: 1; }
  28%, 40% { transform: none; }
  62% { transform: translate(var(--to)); opacity: 1; }
  66%, 100% { transform: translate(var(--to)); opacity: 0; }
}
@keyframes dio-gate {
  0% { opacity: 1; }
  34% { opacity: 0; }
  70% { opacity: 1; }
}
@keyframes dio-gate-up {
  0% { opacity: 0; }
  34% { opacity: 1; }
  70% { opacity: 0; }
}`;

export const mineScene: Scene = { viewBox: viewBox(), svg, css };
