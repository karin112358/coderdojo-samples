const patterns = new Map();
patterns.set('abcefg', 0);
patterns.set('cf', 1);
patterns.set('acdeg', 2);
patterns.set('acdfg', 3);
patterns.set('bcdf', 4);
patterns.set('abdfg', 5);
patterns.set('abdefg', 6);
patterns.set('acf', 7);
patterns.set('abcdefg', 8);
patterns.set('abcdfg', 9);

/** part 1 */
export function part1(input: string): number {
  const rows = splitInput(input);
  let result = 0;

  for (const row of rows) {
    for (let i = 10; i < 14; i++) {
      if (row[i].length <= 4 || row[i].length === 7) {
        result++;
      }
    }
  }

  return result;
}

/** part 2 */
export function part2(input: string): number {
  const rows = splitInput(input);
  let result = 0;

  for (const row of rows) {
    const modifiedRow: string[] = JSON.parse(JSON.stringify(row));
    const one = row.filter((r) => r.length === 2)[0];
    const seven = row.filter((r) => r.length === 3)[0];
    const four = modifiedRow.filter((r) => r.length === 4)[0];
    const eight = modifiedRow.filter((r) => r.length === 7)[0];

    // A
    const aReplacement = seven.split('').filter((c) => !one.includes(c))[0];
    replace(modifiedRow, aReplacement, 'A');

    // C and F
    const firstIsF = row.slice(0, 10).filter((r) => r.length === 6 && r.includes(one[0])).length === 3;
    replace(modifiedRow, one[0], firstIsF ? 'F' : 'C');
    replace(modifiedRow, one[1], firstIsF ? 'C' : 'F');

    // B and D
    const remainingFour = four.replace('C', '').replace('F', '');
    const firstIsB = row.slice(0, 10).filter((r) => r.length === 6 && r.includes(remainingFour[0])).length === 3;
    replace(modifiedRow, remainingFour[0], firstIsB ? 'B' : 'D');
    replace(modifiedRow, remainingFour[1], firstIsB ? 'D' : 'B');

    // E and G
    const remainingEight = eight.split('').filter((i) => i.toLowerCase() === i);
    const firstIsG = row.slice(0, 10).filter((r) => r.length === 6 && r.includes(remainingEight[0])).length === 3;
    replace(modifiedRow, remainingEight[0], firstIsG ? 'G' : 'E');
    replace(modifiedRow, remainingEight[1], firstIsG ? 'E' : 'G');

    // sort
    for (let i = 0; i < 14; i++) {
      modifiedRow[i] = modifiedRow[i]
        .split('')
        .sort((a, b) => (a > b ? 1 : -1))
        .join('')
        .toLowerCase();
    }

    let number = 0;
    for (let i = 10; i < 14; i++) {
      number += patterns.get(modifiedRow[i]) * Math.pow(10, Math.abs(i - 13));
    }

    result += number;
  }

  return result;
}

function replace(input: string[], charToReplace: string, replaceBy: string) {
  for (let i = 0; i < 14; i++) {
    input[i] = input[i].replace(charToReplace, replaceBy);
  }
}

function splitInput(input: string): string[][] {
  return input.split(/\r?\n/).map((i) => i.split(/\s|\|/).filter((i) => i));
}
