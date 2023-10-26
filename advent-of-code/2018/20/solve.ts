/** part 1 */
export function part1(input: string): number {
  return solve(input)[0];
}

/** part 2 */
export function part2(input: string): number {
  return solve(input)[1];
}

interface ToDo {
  x: number;
  y: number;
  patterns: string[];
  length: number;
}

let grid = new Map<string, string[]>();
let todos = new Map<string, ToDo>();
let shortestPathDict = new Map<string, number>();

function solve(pattern: string): [number, number] {
  //pattern = 'WNE'; // 3
  //pattern = 'ENWWW';
  //pattern = 'ENWWW|NEEE|SSE';
  //let pattern = '(NW)(SSE|W)(WNN)';
  //let pattern = 'NN(SSE|W|)SE';
  //let pattern = '(SSE|W)(NN|EE)';
  //let pattern = '(S|N)|(W|EE)';
  //pattern = 'ENWWW(NEEE|SSE(EE|N))'; // 10
  //pattern = 'ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN'; // 18
  //let pattern = 'ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))';
  //pattern = 'WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))'; //31;

  grid = new Map<string, string[]>();
  todos = new Map<string, ToDo>();
  shortestPathDict = new Map<string, number>();

  addToDo(0, 0, pattern, 0);

  let counter = 0;
  while (todos.size) {
    if (counter < 400) {
      console.log(counter++, todos.size);
    }
    splitPattern();
  }

  updateDirections(true);
  return findLongestShortestPath();
}

function findLongestShortestPath(): [number, number] {
  const shortestPaths: number[] = [];
  let shortestPathWithAtLeast1000Doors = 0;

  const nodes = Array.from(grid.entries());

  for (const value of nodes) {
    const length = getShortestPath(value[0], []);
    shortestPaths.push(length);

    if (!shortestPathDict.has(value[0])) {
      shortestPathDict.set(value[0], length);
    }

    if (length >= 1000) {
      shortestPathWithAtLeast1000Doors++;
    }
  }

  return [Math.max(...shortestPaths), shortestPathWithAtLeast1000Doors];
}

function getShortestPath(pos: string, visited: string[]): number {
  const shortestPathTodos = new Array<{ pos: string; visited: string[] }>();

  shortestPathTodos.push({ pos: pos, visited: [] });

  while (shortestPathTodos.length) {
    const todo = shortestPathTodos.shift();

    if (todo) {
      if (todo.pos === '0,0') {
        return todo.visited.length;
      }

      const directions = grid.get(todo.pos);

      if (directions) {
        for (const direction of directions) {
          const splittedKey = todo.pos.split(',');
          let x = parseInt(splittedKey[0]);
          let y = parseInt(splittedKey[1]);

          const existingShortestPath = shortestPathDict.get(todo.pos);
          if (existingShortestPath) {
            return todo.visited.length + existingShortestPath;
          } else {
            x += direction === 'W' ? -1 : direction === 'E' ? 1 : 0;
            y += direction === 'N' ? -1 : direction === 'S' ? 1 : 0;

            if (!visited.includes(key(x, y))) {
              shortestPathTodos.push({ pos: key(x, y), visited: [...todo.visited, todo.pos] });
            }
          }
        }
      }
    }
  }

  return -1;
}

function addToDo(x: number, y: number, pattern: string, length: number) {
  const key = x + ',' + y;
  if (!todos.has(key)) {
    todos.set(key, { x: x, y: y, patterns: [pattern], length: length });
  } else {
    const todo = todos.get(key);
    if (todo) {
      if (!todo.patterns.includes(pattern)) {
        todo.patterns.push(pattern);
      }
    }
  }
}

function updateDirections(drawGrid: boolean): void {
  const items: { x: number; y: number; directions: string[] }[] = [];
  for (const [keyString, value] of grid) {
    const key = keyString.split(',');
    items.push({
      x: parseInt(key[0]),
      y: parseInt(key[1]),
      directions: value,
    });
  }

  const minX = Math.min(...items.map((i) => i.x)) - 1;
  const maxX = Math.max(...items.map((i) => i.x)) + 1;
  const minY = Math.min(...items.map((i) => i.y)) - 1;
  const maxY = Math.max(...items.map((i) => i.y)) + 1;

  for (let y = minY; y <= maxY; y++) {
    // up / down
    let row = '';
    for (let x = minX; x <= maxX; x++) {
      let wall = '#';
      const item = grid.get(key(x, y));
      const prevItem = grid.get(key(x, y - 1));

      if ((item && item.includes('N')) || (prevItem && prevItem.includes('S'))) {
        if (!item) {
          grid.set(key(x, y), ['N']);
        } else if (!item.includes('N')) {
          item.push('N');
        }
        if (!prevItem) {
          grid.set(key(x, y - 1), ['S']);
        } else if (prevItem && !prevItem.includes('S')) {
          prevItem.push('S');
        }
        wall = '-';
      }

      row += '#' + wall;
    }

    drawGrid && console.log(row + '#');

    // left / right
    row = '';
    for (let x = minX; x <= maxX; x++) {
      let wall = '#';
      const item = grid.get(key(x, y));
      const prevItem = grid.get(key(x - 1, y));

      if ((item && item.includes('W')) || (prevItem && prevItem.includes('E'))) {
        if (!item) {
          grid.set(key(x, y), ['W']);
        } else if (!item.includes('W')) {
          item.push('W');
        }
        if (!prevItem) {
          grid.set(key(x - 1, y), ['E']);
        } else if (!prevItem.includes('E')) {
          prevItem.push('E');
        }

        wall = '|';
      }

      row += wall + (x === 0 && y === 0 ? 'X' : '.');
    }

    drawGrid && console.log(row + '#');
  }

  // last row
  let row = '';
  for (let x = minX; x <= maxX; x++) {
    row += '##';
  }

  drawGrid && console.log(row + '#');
}

function key(x: number, y: number): string {
  return x + ',' + y;
}

function splitPattern(): void {
  const item = todos.entries().next().value;
  const key: string = item[0];
  const todo: ToDo = item[1];
  let pattern = todo.patterns.shift();

  if (!todo.patterns.length) {
    todos.delete(key);
  }

  if (!grid.has(key)) {
    grid.set(key, []);
  }

  if (pattern) {
    // find end of first bracket
    if (pattern.startsWith('(')) {
      let i = 0;
      let level = 0;
      while (i < pattern.length && (pattern[i] !== ')' || level !== 1)) {
        if (pattern[i] === '(') {
          level++;
        } else if (pattern[i] === ')') {
          level--;
        }

        if (pattern[i] === '|' && level === 1) {
          pattern = pattern.substring(0, i) + '_' + pattern.substring(i + 1);
        }

        i++;
      }

      const bracketPattern = pattern.substring(1, i);
      let rest = '';
      if (pattern.length >= i) {
        rest = pattern.substring(i + 1);
      }

      if (bracketPattern.includes('_')) {
        for (const pattern of bracketPattern.split('_')) {
          addToDo(todo.x, todo.y, pattern + rest, todo.length);
        }
      } else {
        addToDo(todo.x, todo.y, bracketPattern + rest, todo.length);
      }

      return;
    }

    // add all charachters
    let currX = todo.x;
    let currY = todo.y;
    let currLength = todo.length;

    while (pattern && pattern[0] !== '(' && pattern[0] !== '|') {
      const dir = pattern[0];
      const currKey = currX + ',' + currY;

      if (!grid.has(currKey)) {
        grid.set(currKey, []);
      }

      const directions = grid.get(currKey);
      if (directions && !directions.includes(dir)) {
        directions.push(dir);
      }

      currX += dir === 'W' ? -1 : dir === 'E' ? 1 : 0;
      currY += dir === 'N' ? -1 : dir === 'S' ? 1 : 0;

      pattern = pattern.substring(1);
      currLength++;
    }

    if (pattern) {
      if (pattern.startsWith('|')) {
        // add rest to todos, start with initial position
        addToDo(todo.x, todo.y, pattern.substring(1), todo.length);
      } else {
        // add rest to todos
        addToDo(currX, currY, pattern, currLength);
      }
    }
  }
}
