import { part1, part2 } from './solve.ts';
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1 - 1', () => {
  const input = `Player 1 starting position: 4
Player 2 starting position: 8`;

  assertEquals(part1(input), 739785);
});

Deno.test('part2 - 1', () => {
  const input = `Player 1 starting position: 4
Player 2 starting position: 8`;

  assertEquals(part2(input), 444356092776315);
});

