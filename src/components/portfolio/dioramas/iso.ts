/**
 * Build-time isometric engine shared by the dioramas. A scene is modelled in
 * 3D units (x and y on the ground, z up; the viewer looks from +x +y +z) and
 * projected to SVG path strings. Faces are shaded from their outward normal
 * into tone classes (`roof0` … `roof3`) that Diorama.astro colours with tokens.
 */
export type V = [number, number, number];
export type Shape = { d: string; cls: string };
/** A finished scene: its SVG body and the CSS of its loop. */
export type Scene = { viewBox: string; svg: string; css: string };

const C = Math.cos(Math.PI / 6);
const LIGHT: V = [0.25, 0.55, 1];
const VIEW: V = [1, 1, 1];

const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = (a: V) => Math.hypot(...a);
export const r1 = (n: number) => Math.round(n * 10) / 10;

/** Fill bases of the tone classes; tones mix them towards --dio-tone (see Diorama.astro). */
const BASES: Record<string, string> = {
  ground: 'var(--paper-2)',
  wall: 'var(--dio-wall)',
  body: 'var(--dio-body)',
  roof: 'var(--accent)',
  // Secondary surfaces carry the companion hues, so each scene reads in three
  // colours rather than shades of one.
  soft: 'color-mix(in oklab, var(--accent-2) var(--dio-soft), var(--card))',
  deep: 'color-mix(in oklab, var(--ink) 55%, var(--accent-3))',
};
export const toneCss = Object.entries(BASES)
  .flatMap(([m, base]) =>
    [0, 1, 2, 3].map((i) => `.dio .${m}${i}{--f:color-mix(in oklab, ${base}, var(--dio-tone) var(--dio-k${i}))}`)
  )
  .join('');

/** A scene as a standalone SVG file, ready to be inlined into a .dio figure. */
export const sceneDocument = ({ viewBox, svg, css }: Scene) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" focusable="false"><style>${toneCss}${css}</style>${svg}</svg>`;

export function createScene(S = 16) {
  const bounds = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };

  function proj([x, y, z]: V): [number, number] {
    const p: [number, number] = [(x - y) * C * S, ((x + y) / 2 - z) * S];
    bounds.x0 = Math.min(bounds.x0, p[0]);
    bounds.x1 = Math.max(bounds.x1, p[0]);
    bounds.y0 = Math.min(bounds.y0, p[1]);
    bounds.y1 = Math.max(bounds.y1, p[1]);
    return p;
  }
  const pt = (p: V) => proj(p).map(r1).join(' ');
  const poly = (pts: V[]) => `M${pts.map(pt).join('L')}Z`;
  const line = (a: V, b: V) => `M${pt(a)}L${pt(b)}`;
  /** Screen offset of a 3D move, as `x, y` for a CSS translate. */
  const shift = (dx: number, dy = 0, dz = 0) => `${r1((dx - dy) * C * S)}px, ${r1(((dx + dy) / 2 - dz) * S)}px`;

  /** A flat face shaded by its outward normal (oriented away from `inside`); back faces are dropped. */
  function face(pts: V[], mat: string, inside: V): Shape[] {
    let n = cross(sub(pts[1], pts[0]), sub(pts[2], pts[0]));
    const c = pts.reduce<V>(
      (s, p) => [s[0] + p[0] / pts.length, s[1] + p[1] / pts.length, s[2] + p[2] / pts.length],
      [0, 0, 0]
    );
    if (dot(n, sub(c, inside)) < 0) n = [-n[0], -n[1], -n[2]];
    if (dot(n, VIEW) <= 0) return [];
    const b = dot(n, LIGHT) / (len(n) * len(LIGHT));
    const tone = b > 0.8 ? 0 : b > 0.42 ? 1 : b > 0.18 ? 2 : 3;
    return [{ d: poly(pts), cls: `${mat}${tone}` }];
  }

  function box(x: number, y: number, z: number, dx: number, dy: number, dz: number, mat: string): Shape[] {
    const mid: V = [x + dx / 2, y + dy / 2, z + dz / 2];
    const [X, Y, Z] = [x + dx, y + dy, z + dz];
    return [
      ...face(
        [
          [X, y, z],
          [X, Y, z],
          [X, Y, Z],
          [X, y, Z],
        ],
        mat,
        mid
      ),
      ...face(
        [
          [x, Y, z],
          [X, Y, z],
          [X, Y, Z],
          [x, Y, Z],
        ],
        mat,
        mid
      ),
      ...face(
        [
          [x, y, Z],
          [X, y, Z],
          [X, Y, Z],
          [x, Y, Z],
        ],
        mat,
        mid
      ),
    ];
  }

  /** A body of revolution along the x axis: rings at each station, joined by quads. */
  function loft(stations: { x: number; r: number; z: number }[], yc: number, mat: string, sides = 12): Shape[] {
    const rings = stations.map(({ x, r, z }) =>
      Array.from({ length: sides }, (_, k): V => {
        const a = (2 * Math.PI * (k + 0.5)) / sides;
        return [x, yc + r * Math.cos(a), z + r * Math.sin(a)];
      })
    );
    const out: Shape[] = [];
    for (let i = 0; i < rings.length - 1; i++) {
      const inside: V = [(stations[i].x + stations[i + 1].x) / 2, yc, (stations[i].z + stations[i + 1].z) / 2];
      for (let k = 0; k < sides; k++) {
        const k2 = (k + 1) % sides;
        const quad = [rings[i][k], rings[i + 1][k], rings[i + 1][k2], rings[i][k2]];
        out.push(...face(quad, mat, inside));
      }
    }
    const last = stations.length - 1;
    out.push(...face(rings[last], mat, [stations[last - 1].x, yc, stations[last - 1].z]));
    return out;
  }

  /** The ground slab every scene stands on. */
  function slab(ax: number, ay: number, az = 0.8): Shape[] {
    return [
      ...face(
        [
          [ax, 0, -az],
          [ax, ay, -az],
          [ax, ay, 0],
          [ax, 0, 0],
        ],
        'ground',
        [0, 0, -1]
      ),
      ...face(
        [
          [0, ay, -az],
          [ax, ay, -az],
          [ax, ay, 0],
          [0, ay, 0],
        ],
        'ground',
        [0, 0, -1]
      ),
      ...face(
        [
          [0, 0, 0],
          [ax, 0, 0],
          [ax, ay, 0],
          [0, ay, 0],
        ],
        'ground',
        [0, 0, -1]
      ),
    ];
  }

  /**
   * A narrow-body airliner along the x axis. Its model is 12 units long with
   * the nose at u = 22.85; `ox` places u = 0, `dir` points the nose to +x (1)
   * or -x (-1) and `s` scales it. Returns SVG markup in painter's order, plus
   * its shadow and beacon positions (fin, near wingtip, far wingtip).
   */
  function plane({ ox = 0, yc, dir = 1, s = 1 }: { ox?: number; yc: number; dir?: 1 | -1; s?: number }) {
    const M = ([u, v, w]: V): V => [ox + dir * s * u, yc + s * v, s * w];
    const F = (pts: V[], mat: string, inside: V) => face(pts.map(M), mat, M(inside));
    const L = (stations: { x: number; r: number; z: number }[], v: number, mat: string, sides?: number) =>
      loft(
        stations.map(({ x, r, z }) => ({ x: ox + dir * s * x, r: r * s, z: z * s })),
        yc + s * v,
        mat,
        sides
      );
    const ln = (a: V, b: V) => line(M(a), M(b));

    // Fuselage profile: upswept tail cone, constant section, rounded nose
    const STATIONS = [
      { x: 10.9, r: 0.12, z: 2.05 },
      { x: 12, r: 0.5, z: 1.75 },
      { x: 13.5, r: 0.85, z: 1.45 },
      { x: 20.6, r: 0.85, z: 1.45 },
      { x: 21.4, r: 0.8, z: 1.42 },
      { x: 21.95, r: 0.69, z: 1.37 },
      { x: 22.35, r: 0.52, z: 1.3 },
      { x: 22.62, r: 0.33, z: 1.23 },
      { x: 22.78, r: 0.15, z: 1.18 },
      { x: 22.85, r: 0.04, z: 1.16 },
    ];
    /** A point on the fuselage skin at station u, `deg` degrees above the +y side. */
    const skin = (u: number, deg: number, lift = 0.01): V => {
      const i = Math.max(0, STATIONS.findIndex((st) => st.x >= u) - 1);
      const [a, b] = [STATIONS[i], STATIONS[i + 1]];
      const t = (u - a.x) / (b.x - a.x);
      const r = a.r + t * (b.r - a.r) + lift;
      const zc = a.z + t * (b.z - a.z);
      const rad = (deg * Math.PI) / 180;
      return [u, r * Math.cos(rad), zc + r * Math.sin(rad)];
    };
    const fuselage = L(STATIONS, 0, 'body');
    const WZ = 1.0;
    const wing = (k: 1 | -1): Shape[] => [
      ...F(
        [
          [18, k * 0.8, WZ],
          [14.9, k * 5.2, WZ],
          [14.9, k * 5.2, WZ - 0.14],
          [18, k * 0.8, WZ - 0.14],
        ],
        'body',
        [15, 0, WZ - 1]
      ),
      ...F(
        [
          [18, k * 0.8, WZ],
          [15.2, k * 0.8, WZ],
          [13.6, k * 5.2, WZ],
          [14.9, k * 5.2, WZ],
        ],
        'body',
        [15, 0, WZ - 1]
      ),
    ];
    const stab = (k: 1 | -1) =>
      F(
        [
          [12.7, k * 0.3, 2],
          [11.4, k * 0.3, 2],
          [10.9, k * 2.3, 2],
          [11.6, k * 2.3, 2],
        ],
        'body',
        [12, 0, 1]
      );
    const engine = (k: 1 | -1) =>
      L(
        [
          { x: 16, r: 0.28, z: 0.5 },
          { x: 16.5, r: 0.4, z: 0.5 },
          { x: 18.4, r: 0.4, z: 0.5 },
          { x: 18.6, r: 0.36, z: 0.5 },
        ],
        k * 2.6,
        'soft',
        10
      );
    const fin = F(
      [
        [11.2, 0, 2.1],
        [13.1, 0, 2.1],
        [11.95, 0, 4.05],
        [11.05, 0, 4.05],
      ],
      'roof',
      [12, -1, 3]
    );
    // Strokes are in screen units: scale them with the plane, or a small one
    // ends up with oversized windows and pillars that hide its windscreen.
    const sw = (w: number, extra = '') => (s === 1 ? '' : `stroke-width:${r1(w * s * 100) / 100}${extra}`);
    const gear = (u: number, v: number, top: number) => mark('dio-gear', ln([u, v, top], [u, v, 0]), sw(2));
    const winA = 0.6; // window row, just above the +y side of the fuselage
    const [wy, wz] = [0.85 * Math.cos(winA), 1.45 + 0.85 * Math.sin(winA)];

    const shadow = [
      poly(
        [
          [18.3, -0.8, 0],
          [15, -0.8, 0],
          [13.4, -5.4, 0],
          [14.9, -5.4, 0],
        ].map((p) => M(p as V))
      ),
      poly(
        [
          [18.3, 0.8, 0],
          [15, 0.8, 0],
          [13.4, 5.4, 0],
          [14.9, 5.4, 0],
        ].map((p) => M(p as V))
      ),
      poly(
        [
          [11, -0.7, 0],
          [22.6, -0.7, 0],
          [22.6, 0.7, 0],
          [11, 0.7, 0],
        ].map((p) => M(p as V))
      ),
    ]
      .map((d) => mark('dio-shadow', d))
      .join('');
    // Cockpit: side windows and the front panes wrapping over the nose, split
    // by thin pillars in the fuselage colour.
    const pane = (pts: [number, number][]) => mark('dio-cockpit', poly(pts.map(([u, d]) => M(skin(u, d)))));
    const pillar = (u0: number, d0: number, u1: number, d1: number) =>
      mark('dio-pillar', line(M(skin(u0, d0, 0.02)), M(skin(u1, d1, 0.02))), sw(0.9));
    const cockpit = [
      pane([
        [21.45, 40],
        [21.95, 38],
        [22.18, 52],
        [22.22, 72],
        [22.05, 74],
        [21.85, 58],
        [21.45, 54],
      ]),
      pillar(21.85, 38, 21.86, 58),
      pillar(22.1, 46, 22.07, 70),
    ].join('');
    // Far side, fuselage and fin, then the near side; gear, livery and
    // windows go in between so the near wing can overlap them.
    const body = [
      gear(21, 0, 1),
      gear(16.2, -0.9, 0.9),
      paths([...stab(-1), ...engine(-1), ...wing(-1), ...fuselage, ...fin, ...stab(1)]),
      mark('dio-cheat', ln([13.5, 0.85, 1.45], [20.4, 0.85, 1.45])),
      mark('dio-windows', ln([13.9, wy, wz], [20.1, wy, wz]), sw(2, `;stroke-dasharray:0 ${r1(4 * s * 10) / 10}`)),
      cockpit,
      gear(16.2, 0.9, 0.9),
      paths([...engine(1), ...wing(1)]),
    ].join('');
    const beacons = (
      [
        [11.5, 0, 4.1],
        [14.25, 5.25, WZ + 0.05],
        [14.25, -5.25, WZ + 0.05],
      ] as V[]
    ).map(M);
    return { shadow, body, beacons };
  }

  /** Faces as <path>s, merging consecutive faces of one tone (painter's order is kept). */
  const paths = (list: Shape[]) =>
    list
      .reduce<Shape[]>((out, s) => {
        const last = out[out.length - 1];
        if (last?.cls === s.cls) last.d += s.d;
        else out.push({ ...s });
        return out;
      }, [])
      .map((s) => `<path d="${s.d}" class="${s.cls}"/>`)
      .join('');
  const mark = (cls: string, d: string, style = '') => `<path class="${cls}" d="${d}"${style && ` style="${style}"`}/>`;
  const beacons = (points: V[]) =>
    points
      .map((p, i) => {
        const [x, y] = proj(p).map(r1);
        return `<circle class="dio-beacon" cx="${x}" cy="${y}" r="2.4" style="--i:${i}"/>`;
      })
      .join('');
  const viewBox = (pad = 6) =>
    [bounds.x0 - pad, bounds.y0 - pad, bounds.x1 - bounds.x0 + pad * 2, bounds.y1 - bounds.y0 + pad * 2]
      .map(r1)
      .join(' ');

  return { proj, poly, line, shift, face, box, loft, slab, plane, paths, mark, beacons, viewBox };
}
