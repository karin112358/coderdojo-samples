/** part 1 */
export function part1(input: string): number {
  const rows = splitInput(input);
  let result = 0;

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (
        (x === 0 || rows[y][x] < rows[y][x - 1]) &&
        (x === rows[y].length - 1 || rows[y][x] < rows[y][x + 1]) &&
        (y === 0 || rows[y][x] < rows[y - 1][x]) &&
        (y === rows.length - 1 || rows[y][x] < rows[y + 1][x])
      ) {
        result += rows[y][x] + 1;
      }
    }
  }

  return result;
}

/** part 2 */
export function part2(input: string): number {
  const rows = splitInput(input);
  const basins: number[] = [];

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (
        (x === 0 || rows[y][x] < rows[y][x - 1]) &&
        (x === rows[y].length - 1 || rows[y][x] < rows[y][x + 1]) &&
        (y === 0 || rows[y][x] < rows[y - 1][x]) &&
        (y === rows.length - 1 || rows[y][x] < rows[y + 1][x])
      ) {
        basins.push(findBasinSize(rows, x, y));
      }
    }
  }

  return basins.sort((a, b) => b - a).slice(0, 3).reduce((prev, curr) => prev * curr, 1);
}

function findBasinSize(rows: number[][], x: number, y: number): number {
  let count = 0;

  if (y >= 0 && y < rows.length && x >= 0 && x < rows[y].length && rows[y][x] !== -1 && rows[y][x] !== 9) {
    count++;
    rows[y][x] = -1;

    // count adjacent cells
    count += findBasinSize(rows, x + 1, y);
    count += findBasinSize(rows, x - 1, y);
    count += findBasinSize(rows, x, y + 1);
    count += findBasinSize(rows, x, y - 1);
  }

  return count;
}

function splitInput(input: string): number[][] {
  return input.split(/\r?\n/).map((i) => i.split('').map((i) => parseInt(i)));
}
