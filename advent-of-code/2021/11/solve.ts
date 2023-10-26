/** part 1 */
export function part1(input: string): number {
  const rows = splitInput(input);
  let result = 0;

  for (let i = 0; i < 100; i++) {
    // increase by 1
    rows.forEach((_, y) => rows[y].forEach((_, x) => rows[y][x]++));
    // flash
    rows.forEach((_, y) => rows[y].forEach((_, x) => (result += rows[y][x] > 9 ? flash(rows, y, x) : 0)));
    // set to 0
    rows.forEach((_, y) => rows[y].forEach((_, x) => rows[y][x] == -1 && rows[y][x]++));
  }

  return result;
}

/** part 2 */
export function part2(input: string): number {
  const rows = splitInput(input);
  let i = 0;

  while (true) {
    i++;

    // increase by 1
    rows.forEach((_, y) => rows[y].forEach((_, x) => rows[y][x]++));
    // flash
    rows.forEach((_, y) => rows[y].forEach((_, x) => rows[y][x] > 9 && flash(rows, y, x)));
    // set to 0
    rows.forEach((_, y) => rows[y].forEach((_, x) => rows[y][x] == -1 && rows[y][x]++));

    if (rows.map((r) => r.join('').replace(/0/g, '')).join('').length === 0) {
      break;
    }
  }

  return i;
}

function flash(rows: number[][], y: number, x: number): number {
  let result = 1;
  rows[y][x] = -1;

  for (let modY = -1; modY <= 1; modY++) {
    for (let modX = -1; modX <= 1; modX++) {
      if (
        (modY != 0 || modX != 0) &&
        y + modY >= 0 &&
        y + modY < rows.length &&
        x + modX >= 0 &&
        x + modX < rows[y + modY].length &&
        rows[y + modY][x + modX] !== 0
      ) {
        rows[y + modY][x + modX]++;

        if (rows[y + modY][x + modX] == 10 && rows[y + modY][x + modX] !== -1) {
          result += flash(rows, y + modY, x + modX);
        }
      }
    }
  }

  return result;
}

function splitInput(input: string): number[][] {
  return input.split(/\r?\n/).map((i) => i.split('').map((i) => parseInt(i)));
}
