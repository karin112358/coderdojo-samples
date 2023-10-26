interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** part 1 */
export function part1(input: string): number {
  return calculateResult(input, false);
}

/** part 2 */
export function part2(input: string): number {
  return calculateResult(input, true);
}

function calculateResult(input: string, useDiagonals: boolean): number {
  const lines = splitInput(input);

  // find max
  const maxX = Math.max(...lines.map((l) => l.x1), ...lines.map((l) => l.x2));
  const maxY = Math.max(...lines.map((l) => l.y1), ...lines.map((l) => l.y2));

  const diagram = new Array(maxY + 1);
  for (let y = 0; y < maxY + 1; y++) {
    diagram[y] = new Array(maxX + 1).fill(0);
  }

  // mark lines
  for (const line of lines) {
    if (useDiagonals || line.x1 === line.x2 || line.y1 === line.y2) {
      let { x1, y1, x2, y2 } = line;

      diagram[y2][x2]++;

      while (x1 !== x2 || y1 !== y2) {
        diagram[y1][x1]++;

        if (x1 < x2) {
          x1++;
        } else if (x1 > x2) {
          x1--;
        }

        if (y1 < y2) {
          y1++;
        } else if (y1 > y2) {
          y1--;
        }
      }
    }
  }

  let result = 0;

  for (let y = 0; y < maxY + 1; y++) {
    for (let x = 0; x < maxX + 1; x++) {
      if (diagram[y][x] > 1) {
        result++;
      }
    }
  }

  return result;
}

function splitInput(input: string): Line[] {
  return input
    .split(/\r?\n/)
    .filter((i) => !!i)
    .map((i) => {
      const [x1, y1, x2, y2] = i.split(/,|\W->\W/);
      return { x1: parseInt(x1), y1: parseInt(y1), x2: parseInt(x2), y2: parseInt(y2) };
    });
}
