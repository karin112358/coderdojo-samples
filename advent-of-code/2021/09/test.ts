import { part1, part2 } from './solve.ts';
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1', () => {
  const tests = [
    {
      input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
      expected: 15,
    },
  ];

  for (const test of tests) {
    assertEquals(part1(test.input), test.expected);
  }
});

Deno.test('part2', () => {
  const tests = [
    {
      input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
      expected: 1134,
    },
  ];

  for (const test of tests) {
    assertEquals(part2(test.input), test.expected);
  }
});
