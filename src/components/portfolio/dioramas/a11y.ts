/**
 * A11yScan case study header: a web page on a stand, swept by a scanning beam
 * that flags issues as it passes, a score dial on a pedestal, and a gatehouse
 * whose barrier lets public traffic through and stops the rest (the egress
 * proxy). The loop is CSS only and sits behind prefers-reduced-motion; the
 * static frame shows the flags and both packets at rest.
 */
import { createScene, r1, type Scene, type V } from './iso';

const { poly, line, shift, box, slab, paths, mark, beacons, viewBox } = createScene();

const AX = 24;
const AY = 17;

// The page: a panel facing the viewer, its content drawn on the front face
const P = { x0: 3, x1: 15, y: 3, d: 0.5, z0: 1.4, z1: 8.4 };
const FY = P.y + P.d + 0.02;
const front = (x0: number, z0: number, x1: number, z1: number) =>
  poly([
    [x0, FY, z0],
    [x1, FY, z0],
    [x1, FY, z1],
    [x0, FY, z1],
  ]);
const legs = [P.x0 + 1.5, P.x1 - 2].flatMap((x) => box(x, P.y + 0.1, 0, 0.4, 0.3, P.z0, 'body'));
const foot = box(P.x0 + 0.8, P.y - 0.4, 0, P.x1 - P.x0 - 1.6, 1.1, 0.25, 'wall');
const panel = box(P.x0, P.y, P.z0, P.x1 - P.x0, P.d, P.z1 - P.z0, 'wall');

const bar = front(P.x0 + 0.25, P.z1 - 0.85, P.x1 - 0.25, P.z1 - 0.25);
const url = front(P.x0 + 2.2, P.z1 - 0.7, P.x1 - 2.5, P.z1 - 0.4);
const image = front(4, 4.4, 9, 6.9);
const button = front(4, 1.9, 6.6, 2.5);
const text = (x0: number, x1: number, z: number) => line([x0, FY, z], [x1, FY, z]);
const headings = [text(10, 14, 6.6), text(10, 13, 6)].join('');
const body = [
  text(10, 14.2, 5.2),
  text(10, 13.6, 4.7),
  text(4, 14.2, 3.8),
  text(4, 13.2, 3.3),
  text(4, 11.5, 2.8),
].join('');

// Issues flagged on the page: where each badge sits (x along the page, z up)
const ISSUES: [number, number][] = [
  [9, 6.9],
  [13.6, 4.7],
  [6.6, 2.5],
];
const SCAN = { x0: P.x0 + 0.3, x1: P.x1 - 0.6 };
const beam = front(SCAN.x0, P.z0 + 0.25, SCAN.x0 + 0.3, P.z1 - 1);
const badge = ([x, z]: [number, number], i: number) => {
  const r = 0.32;
  const ring = Array.from({ length: 12 }, (_, k): V => {
    const a = (2 * Math.PI * k) / 12;
    return [x + r * Math.cos(a), FY + 0.01, z + r * Math.sin(a)];
  });
  return `<g class="dio-issue dio-issue-${i}">${mark('dio-flag', poly(ring))}</g>`;
};

// Score dial on a pedestal: a ring on its top face, mostly filled
const D = { cx: 18.6, cy: 10.6, r0: 1.6, r1: 2.3, z: 0.45, score: 0.92 };
const pedestal = box(D.cx - 2.8, D.cy - 2.8, 0, 5.6, 5.6, D.z, 'soft');
const arc = (from: number, to: number) => {
  const n = Math.max(2, Math.round((to - from) * 40));
  const at = (t: number, r: number): V => {
    const a = -Math.PI / 2 + 2 * Math.PI * t;
    return [D.cx + r * Math.cos(a), D.cy + r * Math.sin(a), D.z + 0.01];
  };
  const ts = Array.from({ length: n + 1 }, (_, k) => from + ((to - from) * k) / n);
  return poly([...ts.map((t) => at(t, D.r1)), ...ts.reverse().map((t) => at(t, D.r0))]);
};
const dialTrack = mark('dio-track', arc(0, 1));
const dialScore = mark('dio-score', arc(0, D.score));

// Egress proxy: a two-lane road to the page, a gatehouse on its left and a
// barrier across the near lane. One packet drives through the open lane; the
// other is stopped at the barrier.
const R = { x0: 8, x1: 10.2, y0: P.y + 1, y1: AY };
const road = poly([
  [R.x0, R.y0, 0],
  [R.x1, R.y0, 0],
  [R.x1, R.y1, 0],
  [R.x0, R.y1, 0],
]);
const roadLine = line([(R.x0 + R.x1) / 2, R.y0 + 0.4, 0], [(R.x0 + R.x1) / 2, R.y1 - 0.4, 0]);
const GATE_Y = 10.3;
const gatehouse = [
  ...box(6.4, GATE_Y - 0.6, 0, 1.3, 1.3, 1.7, 'deep'),
  ...box(6.25, GATE_Y - 0.75, 1.7, 1.6, 1.6, 0.2, 'roof'),
];
const barrier = [
  ...box(7.7, GATE_Y, 0, 0.2, 0.2, 1.1, 'body'),
  ...box(7.7, GATE_Y, 1.1, R.x0 + 1.05 - 7.7, 0.18, 0.18, 'roof'),
];

const PK = 0.6;
const START_Y = R.y1 - 1.2;
const packet = (x: number, cls: string, mat: string) =>
  `<g class="${cls}">${mark(
    'dio-shadow',
    poly([
      [x - 0.1, START_Y - 0.1, 0],
      [x + PK + 0.1, START_Y - 0.1, 0],
      [x + PK + 0.1, START_Y + PK + 0.1, 0],
      [x - 0.1, START_Y + PK + 0.1, 0],
    ])
  )}${paths(box(x, START_Y, 0.05, PK, PK, PK, mat))}</g>`;
const passGo = packet(R.x0 + 1.35, 'dio-packet dio-pass', 'body');
const blocked = packet(R.x0 + 0.25, 'dio-packet dio-block', 'roof');
const passDy = R.y0 + 0.2 - START_Y;
const blockDy = GATE_Y + 0.3 - START_Y;

const svg = [
  paths(slab(AX, AY)),
  mark('dio-road', road),
  mark('dio-road-line', roadLine),
  paths(pedestal),
  dialTrack,
  dialScore,
  paths(foot),
  paths(legs),
  paths(panel),
  mark('dio-bar', bar),
  mark('dio-url', url),
  mark('dio-img', image),
  mark('dio-text dio-text-strong', headings),
  mark('dio-text', body),
  mark('dio-button', button),
  `<g class="dio-scan">${mark('dio-beam', beam)}</g>`,
  ...ISSUES.map(badge),
  paths(gatehouse),
  paths(barrier),
  passGo,
  blocked,
  beacons([
    [7.05, GATE_Y + 0.05, 2.05],
    [P.x1 - 0.4, FY, P.z1 + 0.1],
  ]),
].join('');

// One loop: the beam sweeps the page and each badge lights up as it passes;
// meanwhile one packet reaches the page and the other waits at the barrier.
const LOOP = 8;
const SWEEP = 0.7; // share of the loop spent sweeping
const span = SCAN.x1 - SCAN.x0;
const issueFrames = ISSUES.map(([x], i) => {
  const at = r1(((x - SCAN.x0) / span) * SWEEP * 100);
  return `@keyframes dio-issue-${i}{0%,${at}%{opacity:0;transform:scale(0.4)}${r1(at + 3)}%,92%{opacity:1;transform:none}100%{opacity:0}}`;
}).join('');

const css = `
.dio .dio-road { fill: color-mix(in oklab, var(--paper-2), var(--dio-tone) calc(var(--dio-k2) + 6%)); stroke: none; }
.dio .dio-road-line { fill: none; stroke: var(--card); stroke-width: 1.4; stroke-dasharray: 6 6; opacity: 0.8; }
.dio .dio-track { fill: color-mix(in oklab, var(--dio-body) 70%, var(--dio-tone)); stroke: none; opacity: 0.5; }
.dio .dio-score { fill: var(--accent); stroke: none; }
.dio .dio-bar { fill: color-mix(in oklab, var(--dio-tone) 14%, var(--card)); stroke: none; }
.dio .dio-url { fill: var(--card); stroke: none; }
.dio .dio-img { fill: color-mix(in oklab, var(--accent-2) 55%, var(--card)); stroke: none; }
.dio .dio-button { fill: var(--accent); stroke: none; }
.dio .dio-text { fill: none; stroke: color-mix(in oklab, var(--dio-tone) 35%, var(--card)); stroke-width: 2.2; stroke-linecap: round; }
.dio .dio-text-strong { stroke: color-mix(in oklab, var(--dio-tone) 60%, var(--card)); stroke-width: 3.2; }
.dio .dio-beam { fill: var(--accent-3); stroke: none; opacity: 0.55; }
.dio .dio-flag { fill: var(--accent); stroke: var(--card); stroke-width: 1.2; }
.dio .dio-issue { transform-box: fill-box; transform-origin: center; }
.dio .dio-scan { opacity: 0; }
.dio .dio-pass { transform: translate(${shift(0, passDy)}); }
.dio .dio-block { transform: translate(${shift(0, blockDy)}); }
@media (prefers-reduced-motion: no-preference) {
  .dio .dio-scan { animation: dio-scan ${LOOP}s linear infinite both; }
${ISSUES.map((_, i) => `  .dio .dio-issue-${i} { animation: dio-issue-${i} ${LOOP}s ease-out infinite both; }`).join('\n')}
  .dio .dio-pass { animation: dio-pass ${LOOP}s ease-in-out infinite both; }
  .dio .dio-block { animation: dio-block ${LOOP}s ease-in-out infinite both; }
}
@keyframes dio-scan {
  0% { opacity: 1; transform: none; }
  ${SWEEP * 100}% { opacity: 1; transform: translate(${shift(span - 0.3)}); }
  ${SWEEP * 100 + 3}%, 100% { opacity: 0; transform: translate(${shift(span - 0.3)}); }
}
${issueFrames}
@keyframes dio-pass {
  0% { opacity: 0; transform: none; }
  6% { opacity: 1; }
  60% { opacity: 1; transform: translate(${shift(0, passDy)}); }
  70%, 100% { opacity: 0; transform: translate(${shift(0, passDy)}); }
}
@keyframes dio-block {
  10% { opacity: 0; transform: none; }
  16% { opacity: 1; }
  45%, 85% { opacity: 1; transform: translate(${shift(0, blockDy)}); }
  95%, 100% { opacity: 0; transform: translate(${shift(0, blockDy)}); }
}`;

export const a11yScene: Scene = { viewBox: viewBox(), svg, css };
