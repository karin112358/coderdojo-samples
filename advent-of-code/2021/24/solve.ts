interface Result {
  w: number;
  x: number;
  y: number;
  z: number;
}

/** part 1 */
export function part1(input: string): string {
  return calculate(input, true);
}
/** part 2 */
export function part2(input: string): string {
  return calculate(input, false);
}

function calculate(input: string, highestNumber: boolean): string {
  const instructions = splitInput(input);

  let combinationsZ = new Map<number, string>();
  let newCombinationsZ = new Map<number, string>();

  newCombinationsZ.set(0, '');
  let maxZ = 1;

  for (let slice = 0; slice <= 13; slice++) {
    combinationsZ = new Map<number, string>(newCombinationsZ);
    newCombinationsZ = new Map<number, string>();

    // console.log(
    //   'slice',
    //   instructions.slice(18 * slice)[4],
    //   'maxZ',
    //   maxZ,
    //   'add',
    //   parseInt(instructions.slice(18 * slice)[15][2])
    // );

    if (instructions.slice(18 * slice)[4][2] === '1') {
      maxZ = maxZ * 26;
    } else {
      maxZ = Math.ceil(maxZ / 26);
    }

    for (const combination of combinationsZ.entries()) {
      for (let i = 1; i <= 9; i++) {
        const result: Result = { w: 0, x: 0, y: 0, z: combination[0] };
        processInput(result, instructions.slice(18 * (slice + 0), 18 * (slice + 1)), i.toString(), false);
        //processInput(result, instructions.slice(18 * (slice + 0), 18 * (slice + 1)), combination[1] + i, false);

        if (result.z <= maxZ) {
          if (newCombinationsZ.has(result.z)) {
            if (
              (highestNumber && newCombinationsZ.get(result.z)! < combination[1] + i) ||
              (!highestNumber && newCombinationsZ.get(result.z)! > combination[1] + i)
            ) {
              newCombinationsZ.set(result.z, combination[1] + i);
            }
          } else {
            newCombinationsZ.set(result.z, combination[1] + i);
          }
        }

        // if (slice <= 1 || slice >= 12) {
        //   console.log(combination[1] + i, 'z', combination[0], 'result', result);
        // }
      }
    }

    // console.log(
    //   slice,
    //   newCombinationsZ.size,
    //   'maxZ',
    //   maxZ,
    //   [...newCombinationsZ.entries()]
    //     .sort((a, b) => (a[1] > b[1] ? 1 : -1))
    //     .slice(Math.max(0, newCombinationsZ.size - 10))
    // );
  }

  return newCombinationsZ.get(0)!;
}

function processInput(result: any, instructions: string[][], inputValue: string, log: boolean): any {
  let inputPos = 0;

  for (const instruction of instructions) {
    switch (instruction[0]) {
      case 'inp':
        result[instruction[1]] = parseInt(inputValue[inputPos]);
        inputPos++;
        log && console.log(instruction, result);
        break;
      case 'add':
        result[instruction[1]] += getValue(result, instruction[2]);
        log && console.log(instruction, result);
        break;
      case 'mul':
        result[instruction[1]] *= getValue(result, instruction[2]);
        log && console.log(instruction, result);
        break;
      case 'div':
        result[instruction[1]] = result[instruction[1]] / getValue(result, instruction[2]);
        if (result[instruction[1]] > 0) {
          result[instruction[1]] = Math.floor(result[instruction[1]]);
        } else {
          result[instruction[1]] = Math.ceil(result[instruction[1]]);
        }
        log && console.log(instruction, result);
        break;
      case 'mod':
        result[instruction[1]] = result[instruction[1]] % getValue(result, instruction[2]);
        log && console.log(instruction, result);
        break;
      case 'eql':
        result[instruction[1]] = result[instruction[1]] === getValue(result, instruction[2]) ? 1 : 0;
        log && console.log(instruction, result);
        break;
    }
  }

  return result;
}

function getValue(result: any, value: string): number {
  const number = Number(value);
  if (isNaN(number)) {
    return result[value];
  } else {
    return number;
  }
}

function splitInput(input: string): string[][] {
  const instructions = input.split(/\r?\n/).map((i) => i.split(' '));

  return instructions;
}
