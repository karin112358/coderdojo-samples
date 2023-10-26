import { part1, part2 } from './solve.ts';
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1', () => {
  const input = `target area: x=20..30, y=-10..-5`;

  assertEquals(part1(input), 45);
});

Deno.test('part2', () => {
  const input = `target area: x=20..30, y=-10..-5`;

  assertEquals(part2(input), 112);
});
