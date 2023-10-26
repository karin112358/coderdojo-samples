/** part 1 */
export function part1(input: string): number {
  let grid = splitInput(input);
  let state = grid.map((r) => r.join('')).join('');
  let newState = '';
  let counter = 0;

  while (state != newState) {
    counter++;
    state = newState;
    grid = move(1, grid);
    newState = grid.map((r) => r.join('')).join('');
  }

  return counter;
}

/** part 2 */
export function part2(input: string): number {
  return 0;
}

export function move(steps: number, grid: string[][]): string[][] {
  const rows = grid.length;
  const cols = grid[0].length;

  for (let i = 1; i <= steps; i++) {
    let newGrid = getEmptyGrid(rows, cols);

    // move right
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === '>') {
          if (grid[r][(c + 1) % cols] === '.') {
            newGrid[r][(c + 1) % cols] = grid[r][c];
          } else {
            newGrid[r][c] = grid[r][c];
          }
        } else if (grid[r][c] === 'v') {
          newGrid[r][c] = grid[r][c];
        }
      }
    }

    grid = newGrid;

    // move down
    newGrid = getEmptyGrid(rows, cols);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 'v') {
          if (grid[(r + 1) % rows][c] === '.') {
            newGrid[(r + 1) % rows][c] = grid[r][c];
          } else {
            newGrid[r][c] = grid[r][c];
          }
        } else if (grid[r][c] === '>') {
          newGrid[r][c] = grid[r][c];
        }
      }
    }

    grid = newGrid;
  }

  return grid;
}

function getEmptyGrid(rows: number, cols: number): string[][] {
  const newGrid = new Array<string[]>(rows);

  for (let r = 0; r < newGrid.length; r++) {
    {
      newGrid[r] = new Array<string>(cols).fill('.');
    }
  }

  return newGrid;
}

export function splitInput(input: string): string[][] {
  return input.split(/\r?\n/).map((i) => i.split(''));
}
