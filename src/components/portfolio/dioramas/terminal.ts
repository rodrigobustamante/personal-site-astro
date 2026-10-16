/**
 * LATAM Airlines Home case study header: the terminal as the airline's front
 * door, with an airliner at the gate and a departures board on the facade.
 * The loop (a flight takes off, then the board refreshes without anyone
 * touching the building) is CSS only and sits behind prefers-reduced-motion;
 * the static frame is a complete scene on its own.
 */
import { createScene, type Scene } from './iso';

const { poly, line, shift, box, slab, plane, paths, mark, beacons, viewBox } = createScene();

const AX = 24;
const AY = 19.5;

// Terminal: a long low block along the back edge, glass towards the gate
const T = { x0: 1, x1: 6, y0: 1, y1: 18.5, h: 3.2 };
const terminal = [
  ...box(T.x0, T.y0, 0, T.x1 - T.x0, T.y1 - T.y0, T.h, 'wall'),
  ...box(T.x0 - 0.3, T.y0 - 0.3, T.h, T.x1 - T.x0 + 0.7, T.y1 - T.y0 + 0.6, 0.4, 'roof'),
  ...box(2, 4, T.h + 0.4, 1.2, 1.2, 0.5, 'wall'),
  ...box(2.2, 13, T.h + 0.4, 1.6, 1, 0.4, 'wall'),
];
// Facade elements sit just off the x1 face
const FX = T.x1 + 0.02;
const onFacade = (ya: number, yb: number, za: number, zb: number) =>
  poly([
    [FX, ya, za],
    [FX, yb, za],
    [FX, yb, zb],
    [FX, ya, zb],
  ]);
const glass = onFacade(1.8, 10.4, 0.5, 2.6);
const mullions = Array.from({ length: 9 }, (_, i) => 2.4 + i * 0.95).map((y) =>
  mark('dio-mullion', line([FX, y, 0.5], [FX, y, 2.6]))
);

// Departures board. Rows read from screen-left (high y): time, destination, gate.
const board = onFacade(11.4, 17.4, 0.55, 2.85);
const boardHead = onFacade(11.8, 17, 2.38, 2.6);
const ROWS = [
  { z: 1.95, dest: 13.4 },
  { z: 1.55, dest: 14.1 },
  { z: 1.15, dest: 13 },
  { z: 0.75, dest: 13.8 },
];
const rows = ROWS.map(({ z, dest }, i) => {
  const [za, zb] = [z - 0.1, z + 0.1];
  return `<g class="dio-row" style="--i:${i}">${[
    mark('dio-txt', onFacade(16.1, 17, za, zb)),
    mark('dio-txt', onFacade(dest, 15.7, za, zb)),
    mark('dio-txt-acc', onFacade(11.9, 12.6, za, zb)),
  ].join('')}</g>`;
});

// Control tower
const tower = [
  ...box(8.3, 1.7, 0, 0.8, 0.8, 5.6, 'wall'),
  ...box(7.9, 1.3, 5.6, 1.6, 1.6, 1, 'wall'),
  ...box(7.8, 1.2, 6.6, 1.8, 1.8, 0.25, 'roof'),
];
const towerGlass = [
  poly([
    [9.52, 1.4, 5.78],
    [9.52, 2.8, 5.78],
    [9.52, 2.8, 6.45],
    [9.52, 1.4, 6.45],
  ]),
  poly([
    [8, 2.92, 5.78],
    [9.4, 2.92, 5.78],
    [9.4, 2.92, 6.45],
    [8, 2.92, 6.45],
  ]),
];

// Fuel truck beside the gate
const truck = [...box(20.2, 3.2, 0.15, 2.2, 0.9, 0.85, 'soft'), ...box(22.4, 3.2, 0.15, 0.8, 0.9, 0.7, 'roof')];
const truckShadow = poly([
  [20.1, 3.05, 0],
  [23.4, 3.05, 0],
  [23.4, 4.25, 0],
  [20.1, 4.25, 0],
]);

// Airliner at the gate, nose to the terminal, with its jet bridge
const GY = 7;
const gate = plane({ ox: 32.45, yc: GY, dir: -1 });
const bridge = [...box(9.4, GY - 1.3, 0, 0.3, 0.3, 1.3, 'deep'), ...box(T.x1, GY - 1.6, 1.3, 4.8, 1.2, 0.8, 'wall')];

// Runway along the front edge, with a smaller airliner lined up to depart
const RW = { x0: 7.4, x1: 23.6, y0: 15.4, y1: 18.6 };
const runway = poly([
  [RW.x0, RW.y0, 0],
  [RW.x1, RW.y0, 0],
  [RW.x1, RW.y1, 0],
  [RW.x0, RW.y1, 0],
]);
const RY = (RW.y0 + RW.y1) / 2;
const departing = plane({ ox: 3.55, yc: RY, s: 0.5 });

const svg = [
  paths(slab(AX, AY)),
  mark('dio-runway', runway),
  mark('dio-centre', line([RW.x0 + 0.6, RY, 0], [RW.x1 - 0.4, RY, 0])),
  mark('dio-stand', line([10.2, GY, 0], [AX - 0.4, GY, 0])),
  mark('dio-stand', line([9.4, GY - 1.2, 0], [9.4, GY + 1.2, 0])),
  paths(terminal),
  mark('dio-void', glass),
  ...mullions,
  mark('dio-void', board),
  mark('dio-board-head', boardHead),
  ...rows,
  paths(tower),
  ...towerGlass.map((d) => mark('dio-void', d)),
  mark('dio-shadow', truckShadow),
  paths(truck),
  paths(bridge),
  gate.shadow,
  gate.body,
  `<g class="dio-roll" style="--roll:${shift(8)};--climb:${shift(12)}">${departing.shadow}</g>`,
  `<g class="dio-fly" style="--roll:${shift(8)};--climb:${shift(12, 0, 3)}">${departing.body}</g>`,
  beacons([[8.7, 2.1, 7.05], ...gate.beacons]),
].join('');

// The departing flight fades in at the threshold, accelerates down the runway
// and climbs away while its shadow fades on the ground. Once it has gone, the
// board flips row by row to the next departures.
const css = `
.dio .dio-runway { fill: color-mix(in oklab, var(--dio-void) 20%, var(--paper-2)); }
.dio .dio-centre {
  fill: none;
  stroke: color-mix(in oklab, var(--paper-2), var(--dio-tone) var(--dio-k0));
  stroke-width: 1.2;
  stroke-dasharray: 8 7;
}
.dio .dio-mullion { stroke: color-mix(in oklab, var(--dio-wall), var(--ink) 14%); stroke-width: 1.2; }
.dio .dio-board-head, .dio .dio-txt-acc { fill: var(--accent); }
.dio .dio-txt { fill: color-mix(in oklab, var(--paper) 75%, var(--dio-void)); }
:root[data-theme='dark'] .dio .dio-txt { fill: color-mix(in oklab, var(--ink) 60%, var(--dio-void)); }
.dio .dio-row { transform-box: fill-box; transform-origin: center; }
@media (prefers-reduced-motion: no-preference) {
  .dio .dio-fly { animation: dio-fly 12s linear infinite both; }
  .dio .dio-roll { animation: dio-roll 12s linear infinite both; }
  .dio .dio-row {
    animation: dio-flip 12s ease-in-out infinite both;
    animation-delay: calc(var(--i) * 0.18s);
  }
}
@keyframes dio-fly {
  0% { transform: none; opacity: 0; animation-timing-function: cubic-bezier(0.55, 0, 0.9, 0.6); }
  5% { opacity: 1; }
  50% { transform: translate(var(--roll)); animation-timing-function: cubic-bezier(0.2, 0.5, 0.6, 1); }
  64% { opacity: 1; }
  70%, 100% { transform: translate(var(--climb)); opacity: 0; }
}
@keyframes dio-roll {
  0% { transform: none; opacity: 0; animation-timing-function: cubic-bezier(0.55, 0, 0.9, 0.6); }
  5% { opacity: 1; }
  50% { transform: translate(var(--roll)); opacity: 1; animation-timing-function: cubic-bezier(0.2, 0.5, 0.6, 1); }
  64%, 100% { transform: translate(var(--climb)); opacity: 0; }
}
@keyframes dio-flip {
  0%, 80% { transform: none; }
  82% { transform: scaleY(0); }
  84%, 100% { transform: none; }
}`;

export const terminalScene: Scene = { viewBox: viewBox(), svg, css };
