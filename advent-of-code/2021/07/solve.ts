/** part 1 */
export function part1(input: string): number {
  const distances = splitInput(input).sort((a, b) => a - b);
  const distance = distances[Math.floor(distances.length / 2)];
  const result = distances.reduce((prev, curr) => prev + Math.abs(curr - distance), 0);
  return result;
}

/** part 2 */
export function part2(input: string): number {
  const distances = splitInput(input);
  const fuel: number[] = new Array(distances.length);

  for (let i = Math.min(...distances); i < Math.max(...distances) - 1; i++) {
    fuel[i] = distances.reduce(
      (prev, curr) => prev + (Math.abs(curr - i) * (Math.abs(curr - i) + 1)) / 2,
      0
    );
  }

  return Math.min(...fuel);
}

function splitInput(input: string): number[] {
  return input.split(',').map((i) => parseInt(i));
}
