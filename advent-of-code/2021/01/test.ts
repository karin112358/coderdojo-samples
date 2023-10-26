import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';
import { part1, part2 } from './solve.ts';

Deno.test('part1', () => {
  const tests = [
    {
      input: `199
    200
    208
    210
    200
    207
    240
    269
    260
    263`,
      expected: 7,
    },
  ];

  for (const test of tests) {
    assertEquals(part1(test.input), test.expected);
  }
});

Deno.test('part2', () => {
  const tests = [
    {
      input: `199
    200
    208
    210
    200
    207
    240
    269
    260
    263`,
      expected: 5,
    },
  ];

  for (const test of tests) {
    assertEquals(part2(test.input), test.expected);
  }
});
