import { part1, part2 } from './solve.ts';
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1 - small', () => {
  const test = {
    input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`,
    expected: 10,
  };

  assertEquals(part1(test.input), test.expected);
});

Deno.test('part1 - medium', () => {
  const test = {
    input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`,
    expected: 19,
  };

  assertEquals(part1(test.input), test.expected);
});

Deno.test('part1 - large', () => {
  const test = {
    input: `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`,
    expected: 226,
  };

  assertEquals(part1(test.input), test.expected);
});

Deno.test('part2 - small', () => {
  const test = {
    input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`,
    expected: 36,
  };

  assertEquals(part2(test.input), test.expected);
});

Deno.test('part2 - medium', () => {
  const test = {
    input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`,
    expected: 103,
  };

  assertEquals(part2(test.input), test.expected);
});

Deno.test('part2 - large', () => {
  const test = {
    input: `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`,
    expected: 3509,
  };

  assertEquals(part2(test.input), test.expected);
});
