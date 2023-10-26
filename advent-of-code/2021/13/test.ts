import { part1, part2 } from './solve.ts';
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1', () => {
  const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

  assertEquals(part1(input), 17);
});

Deno.test('part2', () => {
  const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

  assertEquals(part2(input), 42);
});
