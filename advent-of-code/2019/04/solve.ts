/** part 1 */
export function part1(input: string): number {
  return getNumberOfPasswords(input, false);
}

/** part 2 */
export function part2(input: string): number {
  return getNumberOfPasswords(input, true);
}

function getNumberOfPasswords(input: string, onlyPairs: boolean): number {
  let result = 0;
  const numberRange = splitInput(input);

  for (let password = numberRange[0]; password <= numberRange[1]; password++) {
    const digits = password.toString().split('');

    let valid = true;
    const same = new Map();

    for (let i = 0; i < digits.length; i++) {
      // check ascending
      if (i > 0) {
        if (digits[i] < digits[i - 1]) {
          valid = false;
        }
      }

      // check occurence count
      same.set(digits[i], digits.filter((d) => d === digits[i]).length);
    }

    if (valid && [...same].find((v) => (onlyPairs ? v[1] === 2 : v[1] >= 2))) {
      result++;
    }
  }

  return result;
}

function splitInput(input: string): number[] {
  return (
    input
      //.split(/\r?\n|,\w?/)
      .split(/-/)
      .filter((i) => !!i)
      .map((i) => parseInt(i))
  );
}
