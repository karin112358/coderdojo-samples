import { part1, part2 } from './solve.ts';
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1 - 1', () => {
  const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

  assertEquals(part1(input), 40);
});

Deno.test('part1 - 2', () => {
  const input = `1911191111
1119111991
9999999111
9999911199
9999119999
9999199999
9111199999
9199999111
9111911191
9991119991`;

  assertEquals(part1(input), 40);
});

Deno.test('part2', () => {
  const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

  assertEquals(part2(input), 315);
});


