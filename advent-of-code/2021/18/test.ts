import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';
import { add, calculate, calculateMagnitude, convertNumber, explode, part1, part2, reduce, split } from './solve.ts';

Deno.test('part1 - convert 1', () => {
  const test = {
    input: `[1,2]`,
    expected: [
      [1, 1],
      [2, 1],
    ],
  };
  assertEquals(convertNumber(test.input), test.expected);
});

Deno.test('part1 - convert 2', () => {
  const test = {
    input: `[[1,2],3]`,
    expected: [
      [1, 2],
      [2, 2],
      [3, 1],
    ],
  };
  assertEquals(convertNumber(test.input), test.expected);
});

Deno.test('part1 - convert 3', () => {
  const test = {
    input: `[9,[8,7]]`,
    expected: [
      [9, 1],
      [8, 2],
      [7, 2],
    ],
  };
  assertEquals(convertNumber(test.input), test.expected);
});

Deno.test('part1 - convert 4', () => {
  const test = {
    input: `[[1,9],[8,5]]`,
    expected: [
      [1, 2],
      [9, 2],
      [8, 2],
      [5, 2],
    ],
  };
  assertEquals(convertNumber(test.input), test.expected);
});

Deno.test('part1 - explode 1', () => {
  const test = {
    input: `[[[[[9,8],1],2],3],4]`,
    expected: [
      [0, 4],
      [9, 4],
      [2, 3],
      [3, 2],
      [4, 1],
    ],
  };
  assertEquals(explode(convertNumber(test.input)).result, test.expected);
});

Deno.test('part1 - explode 2', () => {
  const test = {
    input: `[7,[6,[5,[4,[3,2]]]]]`,
    expected: [
      [7, 1],
      [6, 2],
      [5, 3],
      [7, 4],
      [0, 4],
    ],
  };
  assertEquals(explode(convertNumber(test.input)).result, test.expected);
});

Deno.test('part1 - explode 2', () => {
  const test = {
    input: `[[6,[5,[4,[3,2]]]],1]`,
    expected: [
      [6, 2],
      [5, 3],
      [7, 4],
      [0, 4],
      [3, 1],
    ],
  };
  assertEquals(explode(convertNumber(test.input)).result, test.expected);
});

Deno.test('part1 - explode 3', () => {
  const test = {
    input: `[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]`,
    expected: [
      [3, 2],
      [2, 3],
      [8, 4],
      [0, 4],
      [9, 2],
      [5, 3],
      [4, 4],
      [3, 5],
      [2, 5],
    ],
  };
  assertEquals(explode(convertNumber(test.input)).result, test.expected);
});

Deno.test('part1 - explode 4', () => {
  const test = {
    input: `[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]`,
    expected: [
      [3, 2],
      [2, 3],
      [8, 4],
      [0, 4],
      [9, 2],
      [5, 3],
      [7, 4],
      [0, 4],
    ],
  };
  assertEquals(explode(convertNumber(test.input)).result, test.expected);
});

Deno.test('part1 - split 1', () => {
  const test = {
    input: <[number, number][]>[[10, 0]],
    expected: [
      [5, 1],
      [5, 1],
    ],
  };
  assertEquals(split(test.input).result, test.expected);
});

Deno.test('part1 - split 2', () => {
  const test = {
    input: <[number, number][]>[[11, 0]],
    expected: [
      [5, 1],
      [6, 1],
    ],
  };
  assertEquals(split(test.input).result, test.expected);
});

Deno.test('part1 - reduce 1', () => {
  const test = {
    input: `[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]`,
    expected: [
      [0, 4],
      [7, 4],
      [4, 3],
      [7, 4],
      [8, 4],
      [6, 4],
      [0, 4],
      [8, 2],
      [1, 2],
    ],
  };
  assertEquals(reduce(convertNumber(test.input)), test.expected);
});

Deno.test('part1 - calculate 1', () => {
  const test = {
    input: `[[[[4,3],4],4],[7,[[8,4],9]]]
[1,1]`,
    expected: [
      [0, 4],
      [7, 4],
      [4, 3],
      [7, 4],
      [8, 4],
      [6, 4],
      [0, 4],
      [8, 2],
      [1, 2],
    ]
  };

  assertEquals(add(test.input.split(/\r?\n/).map((i) => convertNumber(i))), test.expected);
});

Deno.test('part1 - calculate 2', () => {
  const test = {
    input: `[1,1]
[2,2]
[3,3]
[4,4]`,
    expected: [
      [1, 4],
      [1, 4],
      [2, 4],
      [2, 4],
      [3, 3],
      [3, 3],
      [4, 2],
      [4, 2],
    ],
  };

  assertEquals(add(test.input.split(/\r?\n/).map((i) => convertNumber(i))), test.expected);
});

Deno.test('part1 - calculate 3', () => {
  const test = {
    input: `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]`,
    expected: [
      [3, 4],
      [0, 4],
      [5, 4],
      [3, 4],
      [4, 3],
      [4, 3],
      [5, 2],
      [5, 2],
    ],
  };

  assertEquals(calculate(test.input), test.expected);
});

Deno.test('part1 - calculate 4', () => {
  const test = {
    input: `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`,
    expected: [
      [5, 4],
      [0, 4],
      [7, 4],
      [4, 4],
      [5, 3],
      [5, 3],
      [6, 2],
      [6, 2],
    ],
  };

  assertEquals(calculate(test.input), test.expected);
});

Deno.test('part1 - calculate 5', () => {
  const test = {
    input: `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]`,
    expected: [
      [4, 4],
      [0, 4],
      [5, 4],
      [4, 4],
      [7, 4],
      [7, 4],
      [6, 4],
      [0, 4],
      [8, 3],
      [7, 4],
      [7, 4],
      [7, 4],
      [9, 4],
      [5, 4],
      [0, 4],
    ],
  };

  assertEquals(calculate(test.input), test.expected);
});

Deno.test('part1 - calculate 6', () => {
  const test = {
    input: `[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]`,
    expected: [
      [6, 4],
      [7, 4],
      [6, 4],
      [7, 4],
      [7, 4],
      [7, 4],
      [0, 4],
      [7, 4],
      [8, 4],
      [7, 4],
      [7, 4],
      [7, 4],
      [8, 4],
      [8, 4],
      [8, 4],
      [0, 4],
    ],
  };

  assertEquals(calculate(test.input), test.expected);
});

Deno.test('part1 - calculate 7', () => {
  const test = {
    input: `[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]`,
    expected: [
      [7, 4],
      [0, 4],
      [7, 4],
      [7, 4],
      [7, 4],
      [7, 4],
      [7, 4],
      [8, 4],
      [7, 4],
      [7, 4],
      [8, 4],
      [8, 4],
      [7, 4],
      [7, 4],
      [8, 4],
      [7, 4],
    ],
  };

  assertEquals(calculate(test.input), test.expected);
});

Deno.test('part1 - calculate 8', () => {
  const test = {
    input: `[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]
[7,[5,[[3,8],[1,4]]]]`,
    expected: [
      [7, 4],
      [7, 4],
      [7, 4],
      [8, 4],
      [9, 4],
      [5, 4],
      [8, 4],
      [7, 4],
      [6, 4],
      [8, 4],
      [0, 4],
      [8, 4],
      [9, 4],
      [9, 4],
      [9, 4],
      [0, 4],
    ],
  };

  assertEquals(calculate(test.input), test.expected);
});

Deno.test('part1 - calculate 9', () => {
  const test = {
    input: `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`,
    expected: [
      [8, 4],
      [7, 4],
      [7, 4],
      [7, 4],
      [8, 4],
      [6, 4],
      [7, 4],
      [7, 4],
      [0, 4],
      [7, 4],
      [6, 4],
      [6, 4],
      [8, 3],
      [7, 3],
    ],
  };

  assertEquals(calculate(test.input), test.expected);
});

Deno.test('part1 - calculate magnitude 1', () => {
  const test = {
    input: `[9,1]`,
    expected: 29,
  };

  assertEquals(calculateMagnitude(convertNumber(test.input)), test.expected);
});

Deno.test('part1 - calculate magnitude 2', () => {
  const test = {
    input: `[[1,2],[[3,4],5]]`,
    expected: 143,
  };

  assertEquals(calculateMagnitude(convertNumber(test.input)), test.expected);
});

Deno.test('part1 - calculate magnitude 3', () => {
  const test = {
    input: `[[[[0,7],4],[[7,8],[6,0]]],[8,1]]`,
    expected: 1384,
  };

  assertEquals(calculateMagnitude(convertNumber(test.input)), test.expected);
});

Deno.test('part1 - calculate magnitude 4', () => {
  const test = {
    input: `[[[[1,1],[2,2]],[3,3]],[4,4]]`,
    expected: 445,
  };

  assertEquals(calculateMagnitude(convertNumber(test.input)), test.expected);
});

Deno.test('part1 - calculate magnitude 5', () => {
  const test = {
    input: `[[[[3,0],[5,3]],[4,4]],[5,5]]`,
    expected: 791,
  };

  assertEquals(calculateMagnitude(convertNumber(test.input)), test.expected);
});

Deno.test('part1 - calculate magnitude 6', () => {
  const test = {
    input: `[[[[5,0],[7,4]],[5,5]],[6,6]]`,
    expected: 1137,
  };

  assertEquals(calculateMagnitude(convertNumber(test.input)), test.expected);
});

Deno.test('part1 - calculate magnitude 7', () => {
  const test = {
    input: `[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]`,
    expected: 3488,
  };

  assertEquals(calculateMagnitude(convertNumber(test.input)), test.expected);
});

// Deno.test('part1 - complete', () => {
//   const test = {
//     input: `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
// [[[5,[2,8]],4],[5,[[9,9],0]]]
// [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
// [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
// [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
// [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
// [[[[5,4],[7,7]],8],[[8,3],8]]
// [[9,3],[[9,9],[6,[4,9]]]]
// [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
// [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`,
//     expected: 4140,
//   };

//   assertEquals(part1(test.input), test.expected);
// });
