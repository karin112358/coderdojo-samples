import { part1, part2 } from './solve.ts';
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1 - 001', () => {
  const input = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`;

  assertEquals(part1(input), 12521);
});

Deno.test('part1 - 002', () => {
  const input = `#############
#A...A......#
###.#B#C#D###
  #.#B#C#D#
  #########`;

  assertEquals(part1(input), 0);
});

Deno.test('part1 - 003', () => {
  const input = `#############
#....A......#
###.#B#C#D###
  #A#B#C#D#
  #########`;

  assertEquals(part1(input), 0);
});

Deno.test('part1 - 004', () => {
  const input = `#############
#.A.........#
###.#B#C#D###
  #B#A#C#D#
  #########`;

  assertEquals(part1(input), 0);
});

Deno.test('part1 - 005', () => {
  const input = `#############
#.......B...#
###B#C#.#D###
###A#D#C#A###`;

  assertEquals(part1(input), 0);
});

Deno.test('part1 - 006', () => {
  const input = `#############
#.........A.#
###.#B#C#D###
  #A#B#C#D#
  #########`;

  assertEquals(part1(input), 8);
});

Deno.test('part1 - 007', () => {
  const input = `#############
#.....D.D.A.#
###.#B#C#.###
  #A#B#C#.#
  #########`;

  assertEquals(part1(input), 8 + 7000);
});

Deno.test('part1 - 008', () => {
  const input = `#############
#.....D.....#
###.#B#C#D###
  #A#B#C#A#
  #########`;

  assertEquals(part1(input), 8 + 7000 + 2003);
});

Deno.test('part1 - 009', () => {
  const input = `#############
#.....D.....#
###B#.#C#D###
###A#B#C#A###`;

  assertEquals(part1(input), 8 + 7000 + 2003 + 40);
});

Deno.test('part1 - 010', () => {
  const input = `#############
#...B.D.....#
###B#.#C#D###
  #A#.#C#A#
  #########`;

  assertEquals(part1(input), 8 + 7000 + 2003 + 40 + 30);
});

// TODO
Deno.test('part1 - 011', () => {
  const input = `#############
#...B.......#
###B#.#C#D###
  #A#D#C#A#
  #########`;

  assertEquals(part1(input), 8 + 7000 + 2003 + 40 + 3000 + 30);
});

Deno.test('part1 - 012', () => {
  const input = `#############
#...B.......#
###B#C#.#D###
  #A#D#C#A#
  #########`;

  assertEquals(part1(input), 8 + 7000 + 2003 + 40 + 3000 + 30 + 400);
});

Deno.test('part1 - 013', () => {
  const input = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`;

  assertEquals(part1(input), 8 + 7000 + 2003 + 40 + 3000 + 30 + 400 + 40);
});

Deno.test('part2 - 078', () => {
  const input = `#############
#..........D#
###B#C#B#.###
  #D#C#B#A#
  #D#B#A#C#
  #A#D#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600 + 70 + 60 + 50 + 5000 + 40 + 600 + 600 + 8 + 30 + 40 + 10);
});

Deno.test('part2 - 079', () => {
  const input = `#############
#A.........D#
###B#C#B#.###
  #D#C#B#.#
  #D#B#A#C#
  #A#D#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600 + 70 + 60 + 50 + 5000 + 40 + 600 + 600 + 8 + 30 + 40);
});

Deno.test('part2 - 080', () => {
  const input = `#############
#A........BD#
###B#C#.#.###
  #D#C#B#.#
  #D#B#A#C#
  #A#D#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600 + 70 + 60 + 50 + 5000 + 40 + 600 + 600 + 8 + 30);
});

Deno.test('part2 - 081', () => {
  const input = `#############
#A......B.BD#
###B#C#.#.###
  #D#C#.#.#
  #D#B#A#C#
  #A#D#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600 + 70 + 60 + 50 + 5000 + 40 + 600 + 600 + 8);
});

Deno.test('part2 - 082', () => {
  const input = `#############
#AA.....B.BD#
###B#C#.#.###
  #D#C#.#.#
  #D#B#.#C#
  #A#D#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600 + 70 + 60 + 50 + 5000 + 40 + 600 + 600);
});

Deno.test('part2 - 083', () => {
  const input = `#############
#AA.....B.BD#
###B#.#.#.###
  #D#C#.#.#
  #D#B#C#C#
  #A#D#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600 + 70 + 60 + 50 + 5000 + 40 + 600);
});

Deno.test('part2 - 084', () => {
  const input = `#############
#AA.....B.BD#
###B#.#.#.###
  #D#.#C#.#
  #D#B#C#C#
  #A#D#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600 + 70 + 60 + 50 + 5000 + 40);
});

Deno.test('part2 - 085', () => {
  const input = `#############
#AA...B.B.BD#
###B#.#.#.###
  #D#.#C#.#
  #D#.#C#C#
  #A#D#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600 + 70 + 60 + 50 + 5000);
});

Deno.test('part2 - 086', () => {
  const input = `#############
#AA.D.B.B.BD#
###B#.#.#.###
  #D#.#C#.#
  #D#.#C#C#
  #A#.#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600 + 70 + 60 + 50);
});

Deno.test('part2 - 087', () => {
  const input = `#############
#AA.D...B.BD#
###B#.#.#.###
  #D#.#C#.#
  #D#.#C#C#
  #A#B#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600 + 70 + 60);
});

Deno.test('part2 - 088', () => {
  const input = `#############
#AA.D.....BD#
###B#.#.#.###
  #D#.#C#.#
  #D#B#C#C#
  #A#B#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600 + 70);
});

Deno.test('part2 - 089', () => {
  const input = `#############
#AA.D......D#
###B#.#.#.###
  #D#B#C#.#
  #D#B#C#C#
  #A#B#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5 + 600);
});

Deno.test('part2 - 090', () => {
  const input = `#############
#AA.D......D#
###B#.#C#.###
  #D#B#C#.#
  #D#B#C#.#
  #A#B#C#A#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000 + 5);
});

Deno.test('part2 - 091', () => {
  const input = `#############
#AA.D.....AD#
###B#.#C#.###
  #D#B#C#.#
  #D#B#C#.#
  #A#B#C#.#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40 + 9000);
});

Deno.test('part2 - 092', () => {
  const input = `#############
#AA.......AD#
###B#.#C#.###
  #D#B#C#.#
  #D#B#C#.#
  #A#B#C#D#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000 + 40);
});

Deno.test('part2 - 093', () => {
  const input = `#############
#AA.......AD#
###.#B#C#.###
  #D#B#C#.#
  #D#B#C#.#
  #A#B#C#D#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000 + 11000);
});

Deno.test('part2 - 094', () => {
  const input = `#############
#AA.......AD#
###.#B#C#.###
  #.#B#C#.#
  #D#B#C#D#
  #A#B#C#D#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4 + 4000);
});

Deno.test('part2 - 095', () => {
  const input = `#############
#AA.D.....AD#
###.#B#C#.###
  #.#B#C#.#
  #.#B#C#D#
  #A#B#C#D#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4 + 4);
});

Deno.test('part2 - 096', () => {
  const input = `#############
#A..D.....AD#
###.#B#C#.###
  #.#B#C#.#
  #A#B#C#D#
  #A#B#C#D#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000 + 4);
});

Deno.test('part2 - 097', () => {
  const input = `#############
#...D.....AD#
###.#B#C#.###
  #A#B#C#.#
  #A#B#C#D#
  #A#B#C#D#
  #########`;

  assertEquals(part2(input), 3000 + 8 + 7000);
});

Deno.test('part2 - 098', () => {
  const input = `#############
#.........AD#
###.#B#C#.###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  #########`;

  assertEquals(part2(input), 3000 + 8);
});

Deno.test('part2 - 099', () => {
  const input = `#############
#..........D#
###A#B#C#.###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  #########`;

  assertEquals(part2(input), 3000);
});

Deno.test('part2 - 100', () => {
  const input = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`;

  assertEquals(part2(input), 44169);
});
