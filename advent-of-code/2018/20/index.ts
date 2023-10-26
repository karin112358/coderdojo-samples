import { readFileSync } from 'fs';

import { part1, part2 } from './solve';
const input = readFileSync('./20/input.txt', { encoding: 'utf8', flag: 'r' });

console.time('part1');
console.log('part1:', part1(input));
console.timeEnd('part1');

console.time('part2');
console.log('part2:', part2(input));
console.timeEnd('part2');
