import { part1, part2 } from "./solve.ts";
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1', () => {
  const tests = [
    {
      input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
      expected: 150,
    },
  ];

  for (const test of tests) {
    assertEquals(part1(test.input), test.expected);
  }
});

Deno.test('part2', () => {
  const tests = [
    {
      input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
      expected: 900,

    },
  ];

  for (const test of tests) {
    assertEquals(part2(test.input), test.expected);
  }
});
