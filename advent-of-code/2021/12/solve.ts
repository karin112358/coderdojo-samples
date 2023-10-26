/** part 1 */
export function part1(input: string): number {
  const connections = splitInput(input);
  const resultPaths: string[] = [];
  findPaths(false, connections, 'start', 'start,', resultPaths, 0);
  return resultPaths.length;
}

/** part 2 */
export function part2(input: string): number {
  const connections = splitInput(input);
  const resultPaths: string[] = [];
  findPaths(true, connections, 'start', 'start,', resultPaths, 0);
  return resultPaths.length;
}

function findPaths(
  secondVisitAllowed: boolean,
  connections: Map<string, string[]>,
  node: string,
  path: string,
  resultPaths: string[],
  level: number
) {
  const targets = (<string[]>connections.get(node)).sort((a, b) => (a < b ? -1 : 1));

  for (const target of targets) {
    if (target === 'end') {
      resultPaths.push(path + target);
    } else {
      let inPath = false;
      let allowed = true;

      if (target.toUpperCase() !== target) {
        inPath = path.indexOf(',' + target + ',') >= 0;
        if (inPath && (target === 'start' || target === 'end' || !secondVisitAllowed)) {
          allowed = false;
        }
      }

      if (allowed) {
        findPaths(secondVisitAllowed && !inPath, connections, target, path + target + ',', resultPaths, level + 1);
      }
    }
  }
}

function addConnection(connections: Map<string, string[]>, source: string, target: string) {
  if (target !== 'start') {
    const connection = connections.get(source);
    if (connection) {
      connection.push(target);
    } else {
      connections.set(source, [target]);
    }
  }
}

function splitInput(input: string): Map<string, string[]> {
  const rows = input.split(/\r?\n/).map((i) => i.split('-'));
  const connections = new Map<string, string[]>();

  rows.forEach((row) => addConnection(connections, row[0], row[1]));
  rows.forEach((row) => addConnection(connections, row[1], row[0]));

  return connections;
}
