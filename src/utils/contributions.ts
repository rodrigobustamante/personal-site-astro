/**
 * Contribution levels for the /uses activity graph, like GitHub's: 0 for no
 * contributions, then 1–4 by quartile of the days that have any.
 */
export function contributionLevels(weeks: number[][]): number[][] {
  const active = weeks
    .flat()
    .filter((n) => n > 0)
    .sort((a, b) => a - b);
  if (active.length === 0) return weeks.map((w) => w.map(() => 0));
  const q = (p: number) => active[Math.min(active.length - 1, Math.floor(p * active.length))];
  const [q1, q2, q3] = [q(0.25), q(0.5), q(0.75)];
  return weeks.map((w) => w.map((n) => (n === 0 ? 0 : n <= q1 ? 1 : n <= q2 ? 2 : n <= q3 ? 3 : 4)));
}

/** The first week index of each month in the calendar, for the month labels. */
export function monthStarts(start: string, weekCount: number): { week: number; month: number }[] {
  const first = new Date(`${start}T00:00:00Z`);
  const out: { week: number; month: number }[] = [];
  let prev = -1;
  for (let w = 0; w < weekCount; w++) {
    const d = new Date(first.getTime() + w * 7 * 86400000);
    const m = d.getUTCMonth();
    if (m !== prev && d.getUTCDate() <= 7) out.push({ week: w, month: m });
    prev = m;
  }
  return out;
}
