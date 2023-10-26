import { part1, part2 } from "./solve.ts";
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1', () => {
  const tests = [
    {
      input: `16,1,2,0,4,2,7,1,2,14`,
      expected: 37,
    },
  ];

  for (const test of tests) {
    assertEquals(part1(test.input), test.expected);
  }
});

Deno.test('part2', () => {
  const tests = [
    {
      input: `16,1,2,0,4,2,7,1,2,14`,
      expected: 168,

    },
  ];

  for (const test of tests) {
    assertEquals(part2(test.input), test.expected);
  }
});
