/** part 1 */
export function part1(input: string): number {
  return solve(input, 80);
}

/** part 2 */
export function part2(input: string): number {
  return solve(input, 256);
}

function solve(input: string, numberOfDays: number): number {
  const numbers = splitInput(input);
  let days = new Array(9).fill(0);

  for (const number of numbers) {
    days[number]++;
  }

  for (let i = 0; i < numberOfDays; i++) {
    const newDays = new Array(9).fill(0);

    newDays[8] = days[0];
    newDays[7] = days[8];
    newDays[6] = days[7] + days[0];

    for (let j = 5; j >= 0; j--) {
      newDays[j] = days[j + 1];
    }

    days = newDays;
  }

  return days.reduce((prev, cur) => prev + cur, 0);
}

function splitInput(input: string): number[] {
  return input.split(',').map((i) => parseInt(i));
}
