/** part 1 */
export function part1(input: string): number {
  const rows = splitInput(input); //.map((r) => r.split(''));
  const { gamma, epsilon } = calculateGammaAndEpsilon(rows);
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

/** part 2 */
export function part2(input: string): number {
  let rows = splitInput(input);
  let { gamma } = calculateGammaAndEpsilon(rows);

  // oxigenGeneratorRating
  let oxigenGeneratorRating = '';
  for (let i = 0; i < rows[0].length; i++) {
    rows = rows.filter((r) => r[i] === gamma[i]);

    if (rows.length === 1) {
      oxigenGeneratorRating = rows[0];
      break;
    }

    gamma = calculateGammaAndEpsilon(rows).gamma;
  }

  // co2ScrubberRating
  rows = splitInput(input);
  gamma = '';
  let { epsilon } = calculateGammaAndEpsilon(rows);

  let co2ScrubberRating = '';
  for (let i = 0; i < rows[0].length; i++) {
    rows = rows.filter((r) => r[i] === epsilon[i]);

    if (rows.length === 1) {
      co2ScrubberRating = rows[0];
      break;
    }

    epsilon = calculateGammaAndEpsilon(rows).epsilon;
  }

  return parseInt(oxigenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);
}

function calculateGammaAndEpsilon(rows: string[]): {
  gamma: string;
  epsilon: string;
} {
  let gamma = '';
  let epsilon = '';

  for (let i = 0; i < rows[0].length; i++) {
    const bit =
      rows.map((r) => parseInt(r[i])).reduce((prev, curr) => prev + curr, 0) >=
      rows.length / 2
        ? '1'
        : '0';

    gamma += bit;
    epsilon += bit === '1' ? '0' : '1';
  }

  return { gamma: gamma, epsilon: epsilon };
}

function splitInput(input: string): string[] {
  return input.split(/\r?\n/).filter((i) => !!i);
}
