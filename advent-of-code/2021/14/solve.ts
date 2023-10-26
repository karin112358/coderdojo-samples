/** part 1 */
export function part1(input: string): number {
  return calculate(input, 10);
}

/** part 2 */
export function part2(input: string): number {
  return calculate(input, 40);
}

function calculate(input: string, steps: number): number {
  const { polymer, rules } = splitInput(input);

  // find pairs
  let pairs = new Map<string, number>();
  for (let pos = polymer.length - 2; pos >= 0; pos--) {
    const pair = polymer[pos] + polymer[pos + 1];
    pairs.set(pair, (pairs.get(pair) ?? 0) + 1);
  }

  // execute steps
  for (let step = 0; step < steps; step++) {
    // new version
    const newPairs = new Map<string, number>();

    for (const key of Array.from(pairs.keys())) {
      const insertKey = rules.get(key);

      if (insertKey) {
        const newKey1 = key[0] + insertKey;
        newPairs.set(newKey1, (newPairs.get(newKey1) ?? 0) + (pairs.get(key) ?? 0));

        const newKey2 = insertKey + key[1];
        newPairs.set(newKey2, (newPairs.get(newKey2) ?? 0) + (pairs.get(key) ?? 0));
      } else {
        newPairs.set(key, (newPairs.get(key) ?? 0) + (pairs.get(key) ?? 0));
      }
    }

    pairs = newPairs;
    console.log(step + 1, pairs);
  }

  const result = new Map<string, number>();

  // count keys of pairs
  for (const key of Array.from(pairs.keys())) {
    result.set(key[0], (result.get(key[0]) ?? 0) + (pairs.get(key) ?? 0));
    result.set(key[1], (result.get(key[1]) ?? 0) + (pairs.get(key) ?? 0));
  }

  // divide by 2
  for (const key of Array.from(result.keys())) {
    result.set(key, Math.ceil((result.get(key) ?? 0) / 2));
  }

  // find min and max
  const max = Math.max(...Array.from(result.values()));
  const min = Math.min(...Array.from(result.values()));

  console.log('result', polymer, pairs, result, max - min);

  return max - min;
}

function splitInput(input: string): { polymer: string[]; rules: Map<string, string> } {
  const rows = input.split(/\r?\n/);

  const polymer = rows[0].split('');
  const rules = new Map<string, string>();

  for (let i = 2; i < rows.length; i++) {
    const row = rows[i].split(' -> ');
    rules.set(row[0], row[1]);
  }

  return { polymer, rules };
}
