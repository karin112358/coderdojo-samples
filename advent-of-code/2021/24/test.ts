import { part1, part2 } from './solve.ts';
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1', () => {
  const input = `inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`;

  assertEquals(part1(input), 17);
});

