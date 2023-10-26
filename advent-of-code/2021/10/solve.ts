const matches = new Map<string, { char: string; value: number }>();
matches.set(')', { char: '(', value: 3 });
matches.set(']', { char: '[', value: 57 });
matches.set('}', { char: '{', value: 1197 });
matches.set('>', { char: '<', value: 25137 });

const autoCompleteValues = new Map<string, number>();
autoCompleteValues.set('(', 1);
autoCompleteValues.set('[', 2);
autoCompleteValues.set('{', 3);
autoCompleteValues.set('<', 4);

/** part 1 */
export function part1(input: string): number {
  const rows = splitInput(input);
  let result = 0;

  for (const row of rows) {
    const found: string[] = [];

    for (const char of row) {
      if (!matches.has(char)) {
        // opening bracket
        found.push(char);
      } else {
        // closing bracket
        const openingBracket = <string>found.pop();
        const expected = matches.get(char);

        if (expected && expected.char !== openingBracket) {
          result += expected.value;
          break;
        }
      }
    }
  }

  return result;
}

/** part 2 */
export function part2(input: string): number {
  const rows = splitInput(input);
  const scores: number[] = [];

  for (const row of rows) {
    const found: string[] = [];
    let hasError = false;

    for (const char of row) {
      if (!matches.has(char)) {
        // opening bracket
        found.push(char);
      } else {
        // closing bracket
        const openingBracket = <string>found.pop();
        const expected = matches.get(char);

        if (expected && expected.char !== openingBracket) {
          hasError = true;
          break;
        }
      }
    }

    if (!hasError) {
      // calculate score for remaining brackets
      let score = 0;

      while (found.length) {
        score = score * 5;
        score += <number>autoCompleteValues.get(<string>found.pop());
      }

      scores.push(score);
    }
  }

  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
}

function splitInput(input: string): string[][] {
  return input.split(/\r?\n/).map((i) => i.split(''));
}
