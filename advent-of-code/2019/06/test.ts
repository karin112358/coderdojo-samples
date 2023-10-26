import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';
import { part1, part2 } from './solve.ts';

Deno.test('part1', () => {
  const tests = [
    {
      input: `COM)B
    B)C
    C)D
    D)E
    E)F
    B)G
    G)H
    D)I
    E)J
    J)K
    K)L`,
      expected: 42,
    },
  ];

  for (const test of tests) {
    assertEquals(part1(test.input), test.expected);
  }
});

Deno.test('part2', () => {
});
