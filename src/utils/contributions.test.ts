import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contributionLevels, monthStarts } from './contributions.ts';

test('contributionLevels: zero stays 0, the rest split by quartile', () => {
  const levels = contributionLevels([
    [0, 1, 2, 3],
    [4, 5, 6, 7, 8],
  ]);
  assert.deepEqual(levels, [
    [0, 1, 1, 1],
    [2, 2, 3, 3, 4],
  ]);
});

test('contributionLevels: an empty year is all zeros', () => {
  assert.deepEqual(contributionLevels([[0, 0], [0]]), [[0, 0], [0]]);
});

test('monthStarts: labels the first full week of each month', () => {
  // 2025-10-19 is a Sunday; November starts in week 2 (Nov 2)
  const starts = monthStarts('2025-10-19', 6);
  assert.deepEqual(starts, [{ week: 2, month: 10 }]);
});
