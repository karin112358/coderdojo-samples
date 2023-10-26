/** part 1 */
export function part1(input: string): number {
  const depths = splitInput(input);
  
  let result = 0;
  
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) {
      result++;
    }
  }

  return result;
}

/** part 2 */
export function part2(input: string): number {
  const depths = splitInput(input);
  
  let result = 0;
  
  for (let i = 3; i < depths.length; i++) {
    if (depths[i - 2] + depths[i - 1] + depths[i] > depths[i - 3] + depths[i - 2] + depths[i - 1]) {
      result++;
    }
  }

  return result;
}

function splitInput(input: string): number[] {
  return input
    .split(/\r?\n|,\w?/)
    .filter((i) => !!i)
    .map((i) => parseInt(i));
}
