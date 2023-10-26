import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';
import { part1, part2 } from './solve.ts';

Deno.test('part1', () => {
  const tests = [
    {
      input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
      expected: 5,
    },
  ];

  for (const test of tests) {
    assertEquals(part1(test.input), test.expected);
  }
});

Deno.test('part2', () => {
  const tests = [
    {
      input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
      expected: 12,
    },
  ];

  for (const test of tests) {
    assertEquals(part2(test.input), test.expected);
  }
});
