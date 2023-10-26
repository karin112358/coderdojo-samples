/** part 1 */
export function part1(input: string): number {
  const result = 0;
  const numberRange = splitInput(input);

  return result;
}

/** part 2 */
export function part2(input: string): number {
  return 42;
}

function splitInput(input: string): number[] {
  return input
    .split(/\r?\n|,\w?/)
    .filter((i) => !!i)
    .map((i) => parseInt(i));
}
