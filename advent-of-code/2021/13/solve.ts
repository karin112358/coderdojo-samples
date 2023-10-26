/** part 1 */
export function part1(input: string): number {
  let { grid, folds } = splitInput(input);

  for (let f = 0; f < folds.length; f++) {
    grid = fold(grid, folds[0]);
  }

  const result = grid
    .map((c) => c.join(''))
    .join('')
    .replace(/\./g, '').length;

  return result;
}

/** part 2 */
export function part2(input: string): number {
  let { grid, folds } = splitInput(input);

  for (let f = 0; f < folds.length; f++) {
    grid = fold(grid, folds[f]);
  }

  console.log(grid.map((c) => c.join('')));

  return 42;
}

function fold(grid: string[][], fold: { direction: string; pos: number }): string[][] {
  if (fold.direction === 'y') {
    let newY = fold.pos - 1;
    for (let y = fold.pos + 1; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === '#') {
          grid[newY][x] = '#';
        }
      }

      newY--;
    }

    grid = grid.slice(0, fold.pos);
  } else {
    for (let y = 0; y < grid.length; y++) {
      let newX = fold.pos - 1;
      for (let x = fold.pos + 1; x < grid[y].length; x++) {
        if (grid[y][x] === '#') {
          grid[y][newX] = '#';
        }

        newX--;
      }

      grid[y] = grid[y].slice(0, fold.pos);
    }
  }

  return grid;
}

function splitInput(input: string): { grid: string[][]; folds: { direction: string; pos: number }[] } {
  const coordinates = input
    .split(/\r?\n/)
    .map((i) => i.split(','))
    .filter((i) => i.length === 2)
    .map((i) => ({ x: parseInt(i[0]), y: parseInt(i[1]) }));

  const folds = input
    .split(/\r?\n/)
    .filter((i) => i.startsWith('fold'))
    .map((i) => i.split(' ')[2].split('='))
    .map((i) => ({ direction: i[0], pos: parseInt(i[1]) }));

  const maxX = Math.max(...coordinates.map((c) => c.x));
  const maxY = Math.max(...coordinates.map((c) => c.y));

  const grid: string[][] = new Array(maxY + 1);
  for (let y = 0; y <= maxY; y++) {
    grid[y] = new Array(maxX + 1).fill('.');
  }

  for (const coordinate of coordinates) {
    grid[coordinate.y][coordinate.x] = '#';
  }

  return { grid, folds };
}
