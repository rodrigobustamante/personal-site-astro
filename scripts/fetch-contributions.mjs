// Fetches the last year of GitHub contributions for the /uses activity graph
// and writes them to src/data/contributions.json. Run by the contributions
// workflow; needs GITHUB_TOKEN in the environment.
import { writeFileSync } from 'node:fs';

const LOGIN = 'rodrigobustamante';
const OUT = new URL('../src/data/contributions.json', import.meta.url);

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('GITHUB_TOKEN is required');
  process.exit(1);
}

const query = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, variables: { login: LOGIN } }),
});
const json = await res.json();
if (!res.ok || json.errors) {
  console.error(JSON.stringify(json.errors ?? json, null, 2));
  process.exit(1);
}

const calendar = json.data.user.contributionsCollection.contributionCalendar;
const weeks = calendar.weeks.map((w) => w.contributionDays.map((d) => d.contributionCount));
const data = {
  login: LOGIN,
  total: calendar.totalContributions,
  // Date of the first day in `weeks`; each week starts on Sunday, the last one may be partial
  start: calendar.weeks[0].contributionDays[0].date,
  weeks,
};
writeFileSync(OUT, JSON.stringify(data) + '\n');
console.log(`Wrote ${data.total} contributions over ${weeks.length} weeks`);
