import { move, part1, part2, splitInput } from './solve.ts';
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1 - 001', () => {
  const input = `...>>>>>...`;

  assertEquals(move(2, splitInput(input)), splitInput('...>>>.>.>.'));
});

Deno.test('part1 - 002', () => {
  const input = `..........
.>v....v..
.......>..
..........`;

  assertEquals(
    move(1, splitInput(input)),
    splitInput(`..........
.>........
..v....v>.
..........`)
  );
});

Deno.test('part1 - 003', () => {
  const input = `...>...
.......
......>
v.....>
......>
.......
..vvv..`;

  assertEquals(
    move(4, splitInput(input)),
    splitInput(`>......
..v....
..>.v..
.>.v...
...>...
.......
v......`)
  );
});

Deno.test('part1 - 004', () => {
  const input = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;

  assertEquals(
    move(40, splitInput(input)),
    splitInput(`>>v>v..v..
..>>v..vv.
..>>>v.>.v
..>>>>vvv>
v.....>...
v.v...>v>>
>vv.....v>
.>v...v.>v
vvv.v..v.>`)
  );
});

Deno.test('part1 - 005', () => {
  const input = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;

  assertEquals(part1(input), 58);
});
