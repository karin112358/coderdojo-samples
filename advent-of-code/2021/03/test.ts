import { part1, part2 } from "./solve.ts";
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1', () => {
  const tests = [
    {
      input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
      expected: 198,
    },
  ];

  for (const test of tests) {
    assertEquals(part1(test.input), test.expected);
  }
});

Deno.test('part2', () => {
  const tests = [
    {
      input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
      expected: 230,

    },
  ];

  for (const test of tests) {
    assertEquals(part2(test.input), test.expected);
  }
});
