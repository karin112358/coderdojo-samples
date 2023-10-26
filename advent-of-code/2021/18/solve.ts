/** part 1 */
export function part1(input: string): number {
  return calculateMagnitude(calculate(input));
}

/** part 2 */
export function part2(input: string): number {
  const numbers = input.split(/\r?\n/).map((i) => convertNumber(i));
  let max = 0;
  let sum = 0;

  for (let x = 0; x < numbers.length; x++) {
    for (let y = 0; y < numbers.length; y++) {
      if (x !== y) {
        sum = calculateMagnitude(addInternal(copy(numbers[x]), copy(numbers[y])));
        if (sum > max) max = sum;

        sum = calculateMagnitude(addInternal(copy(numbers[y]), copy(numbers[x])));
        if (sum > max) max = sum;
      }
    }
  }

  return max;
}

export function convertNumber(input: string): [number, number][] {
  const result: [number, number][] = [];
  let level = 0;

  for (const char of input) {
    if (char === '[') {
      level++;
    } else if (char === ']') {
      level--;
    } else if (char !== ',') {
      result.push([parseInt(char), level]);
    }
  }

  return result;
}

export function explode(input: [number, number][]): { result: [number, number][]; success: boolean } {
  let success = false;
  const pos = input.findIndex((n, i) => i < input.length - 1 && n[1] === 5 && n[1] === input[i + 1][1]);

  if (pos >= 0) {
    success = true;
    const left = input[pos][0];
    const right = input[pos + 1][0];

    input[pos][0] = 0;
    input[pos][1]--;

    if (pos > 0) {
      input[pos - 1][0] += left;
    }

    if (pos < input.length - 2) {
      input[pos + 2][0] += right;
    }

    input.splice(pos + 1, 1);
  }

  return { result: input, success };
}

export function split(input: [number, number][]): { result: [number, number][]; success: boolean } {
  let success = false;
  const pos = input.findIndex((n) => n[0] >= 10);

  if (pos >= 0) {
    success = true;
    const number = input[pos][0];

    input[pos][0] = Math.floor(number / 2);
    input[pos][1]++;

    input.splice(pos + 1, 0, [Math.ceil(number / 2), input[pos][1]]);
  }

  return { result: input, success };
}

export function reduce(input: [number, number][]): [number, number][] {
  let success = true;

  while (success) {
    success = false;

    if (explode(input).success) {
      success = true;
    } else if (split(input).success) {
      success = true;
    }
  }

  return input;
}

export function add(input: [number, number][][]): [number, number][] {
  let result = input[0];

  for (let i = 1; i < input.length; i++) {
    result = addInternal(result, input[i]);
  }

  return result;
}

export function calculate(input: string): [number, number][] {
  return reduce(add(input.split(/\r?\n/).map((i) => convertNumber(i))));
}

export function calculateMagnitude(input: [number, number][]): number {
  let pos = 0;
  while (input.length > 1 && pos >= 0) {
    // find pair
    pos = input.findIndex((n, i) => i < input.length - 1 && n[1] === input[i + 1][1]);

    // calculate
    if (pos >= 0) {
      input[pos][0] = input[pos][0] * 3 + input[pos + 1][0] * 2;
      input[pos][1]--;
      input.splice(pos + 1, 1);
    }
  }

  return input[0][0];
}

function addInternal(input1: [number, number][], input2: [number, number][]): [number, number][] {
  const result = [...input1, ...input2];
  result.forEach((i) => i[1]++);
  return reduce(result);
}

function copy(number: [number, number][]): [number, number][] {
  return number.map((i) => <[number, number]>i.slice());
}
