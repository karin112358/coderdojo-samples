const neighbours = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

/** part 1 */
export function part1(input: string): number {
  return solve(input, false);
}

/** part 2 */
export function part2(input: string): number {
  return solve(input, true);
}

function solve(input: string, extendGrid: boolean): number {
  let minResult = -1;
  let grid: number[][];
  let queue: { lastPos: { x: number; y: number }; value: number }[] = [];

  // build grid
  if (extendGrid) {
    const tmpGrid = splitInput(input);

    grid = new Array(tmpGrid.length * 5);
    for (let y = 0; y < grid.length; y++) {
      grid[y] = new Array(tmpGrid[0].length * 5);

      for (let x = 0; x < grid[y].length; x++) {
        const addX = Math.floor(x / tmpGrid.length);
        const addY = Math.floor(y / tmpGrid[0].length);
        let newVal = tmpGrid[y % tmpGrid.length][x % tmpGrid[0].length] + addX + addY;
        while (newVal > 9) {
          newVal -= 9;
        }
        grid[y][x] = newVal;
      }
    }
  } else {
    grid = splitInput(input);
  }

  // build min values grid
  const minValues = new Array(grid.length);
  for (let i = 0; i < grid.length; i++) {
    minValues[i] = new Array(grid[0].length).fill(-1);
  }

  queue.push({ lastPos: { x: 0, y: 0 }, value: 0 });

  // find path
  while (queue.length) {
    queue = queue.sort((a, b) => a.value - b.value);

    // sort with distance to end
    // queue = queue.sort(
    //   (a, b) => (a.value + (200 - a.lastPos.x - a.lastPos.y)) - (b.value + (200 - b.lastPos.x - b.lastPos.y))
    // );
    //console.log(queue);

    const { lastPos, value } = queue.shift()!;

    if (lastPos.x === grid[0].length - 1 && lastPos.y === grid.length - 1) {
      // end reached
      if (minResult === -1 || value < minResult) {
        minValues[lastPos.y][lastPos.x] = value;
        minResult = value;
      }
    } else if (value < minResult || minResult === -1) {
      // update min value at position
      if (minValues[lastPos.y][lastPos.x] === -1 || value < minValues[lastPos.y][lastPos.x]) {
        minValues[lastPos.y][lastPos.x] = value;

        // next step
        const nextSteps: { x: number; y: number; value: number }[] = [];
        for (const neighbour of neighbours) {
          if (
            lastPos.y + neighbour[1] < grid.length &&
            lastPos.y + neighbour[1] >= 0 &&
            lastPos.x + neighbour[0] < grid[0].length &&
            lastPos.x + neighbour[0] >= 0
          )
            nextSteps.push({
              x: lastPos.x + neighbour[0],
              y: lastPos.y + neighbour[1],
              value: value + grid[lastPos.y + neighbour[1]][lastPos.x + neighbour[0]],
            });
        }

        for (const step of nextSteps) {
          if (minValues[step.y][step.x] === -1 || value < minValues[step.y][step.x]) {
            queue.push({ lastPos: { x: step.x, y: step.y }, value: step.value });
          }
        }
      }
    }
  }

  console.log(minResult, minValues[minValues.length - 1][minValues[0].length - 1]);

  return minValues[minValues.length - 1][minValues[0].length - 1];
}

function splitInput(input: string): number[][] {
  const rows = input.split(/\r?\n/).map((i) => i.split('').map((i) => parseInt(i)));
  return rows;
}
