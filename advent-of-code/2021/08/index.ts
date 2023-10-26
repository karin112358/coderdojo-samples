import { part1, part2 } from './solve.ts';
const input = await Deno.readTextFile('./2021/08/input.txt');

console.time('part1');
console.log('part1:', part1(input));
console.timeEnd('part1');

console.time('part2');
console.log('part2:', part2(input));
console.timeEnd('part2');

