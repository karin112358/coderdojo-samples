import { part1, part2 } from "./solve.ts";
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1', () => {
  const tests = [
    {
      input: `3,4,3,1,2`,
      expected: 5934,
    },
  ];

  for (const test of tests) {
    assertEquals(part1(test.input), test.expected);
  }
});

Deno.test('part2', () => {
  const tests = [
    {
      input: `3,4,3,1,2`,
      expected: 26984457539,

    },
  ];

  for (const test of tests) {
    assertEquals(part2(test.input), test.expected);
  }
});
