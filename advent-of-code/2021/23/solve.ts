interface State {
  amphipods: Map<string, string>;
  energy: number;
}

/** part 1 */
export function part1(input: string): number {
  const inputAmphipods = splitInput(input, false).amphipods;
  const states: State[] = [{ amphipods: inputAmphipods, energy: 0 }];
  const target = new Map<string, number>();
  target.set('A', 3);
  target.set('B', 5);
  target.set('C', 7);
  target.set('D', 9);

  // console.log('path', path);
  console.log('amphipods', inputAmphipods);

  const handledStates = new Set<string>();
  handledStates.add(buildKey(inputAmphipods, 0));

  const successStates: { amphipods: Map<string, string>; energy: number }[] = [];
  let counter = 0;

  while (states.length) {
    const state = states.shift()!;

    counter++;
    if (counter % 1 === 0 && counter >= 0 && counter < 50) {
      console.log(
        'counter',
        counter,
        'energy',
        state.energy,
        'successStates',
        successStates.length,
        'states',
        states.length
      );
      printState(state.amphipods);
    }

    if (
      state.amphipods.get('2,3') === 'A' &&
      state.amphipods.get('3,3') === 'A' &&
      state.amphipods.get('2,5') === 'B' &&
      state.amphipods.get('3,5') === 'B' &&
      state.amphipods.get('2,7') === 'C' &&
      state.amphipods.get('3,7') === 'C' &&
      state.amphipods.get('2,9') === 'D' &&
      state.amphipods.get('3,9') === 'D'
    ) {
      successStates.push(state);
    } else {
      for (const amphipod of state.amphipods.entries()) {
        const [row, col] = amphipod[0].split(',').map((a) => parseInt(a));
        const targetCol = target.get(amphipod[1])!;

        if (row === 1) {
          // find target room
          findTargetRoom(states, handledStates, amphipod, state, row, col, targetCol, false);
        } else if (row === 3 && col !== targetCol) {
          // find target room
          const success = findTargetRoom(states, handledStates, amphipod, state, row, col, targetCol, false);

          // step into hallway
          if (!success) {
            for (let newCol = col - 11; newCol <= col + 11; newCol++) {
              if (newCol >= 1 && newCol !== 3 && newCol !== 5 && newCol !== 7 && newCol !== 9 && newCol <= 11) {
                move(states, handledStates, amphipod, state, row, col, 1, newCol);
              }
            }
          }
        } else if (
          row === 2 &&
          (col !== targetCol || (state.amphipods.has('3,' + col) && state.amphipods.get('3,' + col) !== amphipod[1]))
        ) {
          // find target room
          const success = findTargetRoom(states, handledStates, amphipod, state, row, col, targetCol, false);

          // step into hallway
          if (!success) {
            for (let newCol = col - 11; newCol <= col + 11; newCol++) {
              if (newCol >= 1 && newCol !== 3 && newCol !== 5 && newCol !== 7 && newCol !== 9 && newCol <= 11) {
                move(states, handledStates, amphipod, state, row, col, 1, newCol);
              }
            }
          }
        }
      }
    }
  }

  return Math.min(...successStates.map((s) => s.energy));
}

/** part 2 */
export function part2(input: string): number {
  const inputAmphipods = splitInput(input, true).amphipods;

  const states: State[] = [{ amphipods: inputAmphipods, energy: 0 }];
  const target = new Map<string, number>();
  target.set('A', 3);
  target.set('B', 5);
  target.set('C', 7);
  target.set('D', 9);

  // console.log('path', path);
  console.log('amphipods', inputAmphipods);

  const handledStates = new Set<string>();
  handledStates.add(buildKey(inputAmphipods, 0));

  const successStates: { amphipods: Map<string, string>; energy: number }[] = [];
  let counter = 0;

  while (states.length) {
    //console.log('states', states.length, 'handledStates', handledStates.size);
    const state = states.shift()!;
    //console.log('state', state, handledStates);
    counter++;
    if (counter % 1 === 0 && counter >= 0 && counter < 100) {
      // console.log(
      //   'counter',
      //   counter,
      //   'energy',
      //   state.energy,
      //   'successStates',
      //   successStates.length,
      //   'states',
      //   states.length
      // );
      printState(state.amphipods);
    }

    if (
      state.amphipods.get('2,3') === 'A' &&
      state.amphipods.get('3,3') === 'A' &&
      state.amphipods.get('4,3') === 'A' &&
      state.amphipods.get('5,3') === 'A' &&
      state.amphipods.get('2,5') === 'B' &&
      state.amphipods.get('3,5') === 'B' &&
      state.amphipods.get('4,5') === 'B' &&
      state.amphipods.get('5,5') === 'B' &&
      state.amphipods.get('2,7') === 'C' &&
      state.amphipods.get('3,7') === 'C' &&
      state.amphipods.get('4,7') === 'C' &&
      state.amphipods.get('5,7') === 'C' &&
      state.amphipods.get('2,9') === 'D' &&
      state.amphipods.get('3,9') === 'D' &&
      state.amphipods.get('4,9') === 'D' &&
      state.amphipods.get('5,9') === 'D'
    ) {
      successStates.push(state);
    } else {
      for (const amphipod of state.amphipods.entries()) {
        const [row, col] = amphipod[0].split(',').map((a) => parseInt(a));
        const targetCol = target.get(amphipod[1])!;

        if (row === 1) {
          // find target room
          findTargetRoom(states, handledStates, amphipod, state, row, col, targetCol, true);
        } else if (row === 3 && col !== targetCol) {
          // find target room
          const success = findTargetRoom(states, handledStates, amphipod, state, row, col, targetCol, true);

          // step into hallway
          if (!success) {
            stepIntoHallway(states, handledStates, amphipod, state, row, col);
          }
        } else if (
          row === 2 &&
          (col !== targetCol ||
            (state.amphipods.has('3,' + col) && state.amphipods.get('3,' + col) !== amphipod[1]) ||
            (state.amphipods.has('4,' + col) && state.amphipods.get('4,' + col) !== amphipod[1]) ||
            (state.amphipods.has('5,' + col) && state.amphipods.get('5,' + col) !== amphipod[1]))
        ) {
          // find target room
          const success = findTargetRoom(states, handledStates, amphipod, state, row, col, targetCol, true);

          // step into hallway
          if (!success) {
            stepIntoHallway(states, handledStates, amphipod, state, row, col);
          }
        } else if (
          row === 3 &&
          (col !== targetCol ||
            (state.amphipods.has('4,' + col) && state.amphipods.get('4,' + col) !== amphipod[1]) ||
            (state.amphipods.has('5,' + col) && state.amphipods.get('5,' + col) !== amphipod[1]))
        ) {
          // find target room
          const success = findTargetRoom(states, handledStates, amphipod, state, row, col, targetCol, true);

          // step into hallway
          if (!success) {
            stepIntoHallway(states, handledStates, amphipod, state, row, col);
          }
        } else if (
          row === 4 &&
          (col !== targetCol || (state.amphipods.has('5,' + col) && state.amphipods.get('5,' + col) !== amphipod[1]))
        ) {
          // find target room
          const success = findTargetRoom(states, handledStates, amphipod, state, row, col, targetCol, true);

          // step into hallway
          if (!success) {
            stepIntoHallway(states, handledStates, amphipod, state, row, col);
          }
        } else if (row === 5 && col !== targetCol) {
          // find target room
          const success = findTargetRoom(states, handledStates, amphipod, state, row, col, targetCol, true);

          // step into hallway
          if (!success) {
            stepIntoHallway(states, handledStates, amphipod, state, row, col);
          }
        }
      }
    }
  }

  return Math.min(...successStates.map((s) => s.energy));
}

function stepIntoHallway(
  states: State[],
  handledStates: Set<string>,
  amphipod: [string, string],
  state: State,
  row: number,
  col: number
): void {
  for (let newCol = col - 11; newCol <= col + 11; newCol++) {
    if (newCol >= 1 && newCol !== 3 && newCol !== 5 && newCol !== 7 && newCol !== 9 && newCol <= 11) {
      move(states, handledStates, amphipod, state, row, col, 1, newCol);
    }
  }
}

function findTargetRoom(
  states: State[],
  handledStates: Set<string>,
  amphipod: [string, string],
  state: State,
  row: number,
  col: number,
  targetCol: number,
  includeFoldedAmphipods: boolean
): boolean {
  let success = false;

  if (includeFoldedAmphipods) {
    success = move(states, handledStates, amphipod, state, row, col, 5, targetCol);

    if (!success) {
      if (state.amphipods.has('5,' + targetCol) && state.amphipods.get('5,' + targetCol) === amphipod[1]) {
        success = move(states, handledStates, amphipod, state, row, col, 4, targetCol);

        if (!success) {
          if (state.amphipods.has('4,' + targetCol) && state.amphipods.get('4,' + targetCol) === amphipod[1]) {
            success = move(states, handledStates, amphipod, state, row, col, 3, targetCol);

            if (!success) {
              if (state.amphipods.has('3,' + targetCol) && state.amphipods.get('3,' + targetCol) === amphipod[1]) {
                success = move(states, handledStates, amphipod, state, row, col, 2, targetCol);
              }
            }
          }
        }
      }
    }
  } else {
    success = move(states, handledStates, amphipod, state, row, col, 3, targetCol);

    if (!success) {
      if (state.amphipods.has('3,' + targetCol) && state.amphipods.get('3,' + targetCol) === amphipod[1]) {
        success = move(states, handledStates, amphipod, state, row, col, 2, targetCol);
      }
    }
  }

  return success;
}

function getPathEnergy(
  state: State,
  amphipod: [string, string],
  row: number,
  col: number,
  targetRow: number,
  targetCol: number
): number {
  let isFree = true;
  let energy = 0;

  //console.log('get energy', row, col, targetRow, targetCol);

  // up
  while (row > 1 && isFree) {
    row--;
    if (state.amphipods.has(row + ',' + col)) {
      isFree = false;
    } else {
      energy += getEnergy(amphipod[1]);
      //console.log('up', amphipod[1], row, col, isFree, energy);
    }
  }

  // left, right
  while (col !== targetCol && isFree) {
    col += col > targetCol ? -1 : 1;
    if (state.amphipods.has(row + ',' + col)) {
      isFree = false;
    } else {
      energy += getEnergy(amphipod[1]);
      //console.log('left/right', amphipod[1], row, col, isFree, energy);
    }
  }

  // down
  while (row < targetRow && isFree) {
    row++;
    if (state.amphipods.has(row + ',' + col)) {
      isFree = false;
    } else {
      energy += getEnergy(amphipod[1]);
      //console.log('down', amphipod[1], row, col, isFree, energy);
    }
  }

  if (isFree) {
    return energy;
  } else {
    return 0;
  }
}

function move(
  states: State[],
  handledStates: Set<string>,
  amphipod: [string, string],
  state: State,
  row: number,
  col: number,
  targetRow: number,
  targetCol: number
): boolean {
  const energy = getPathEnergy(state, amphipod, row, col, targetRow, targetCol);
  //console.log('move', amphipod[1], row, col, targetRow, targetCol, energy);

  if (energy > 0) {
    const newAmphipods = new Map(state.amphipods);
    newAmphipods.delete(amphipod[0]);
    newAmphipods.set(targetRow + ',' + targetCol, amphipod[1]);
    const newHandledStatesKey = buildKey(newAmphipods, state.energy + energy);

    if (!handledStates.has(newHandledStatesKey)) {
      states.push({
        amphipods: newAmphipods,
        energy: state.energy + energy,
      });
      handledStates.add(newHandledStatesKey);
    }
  }

  return energy > 0;
}

function getEnergy(amphipod: string): number {
  switch (amphipod) {
    case 'A':
      return 1;
    case 'B':
      return 10;
    case 'C':
      return 100;
    case 'D':
      return 1000;
  }
  return 0;
}

function buildKey(amphipods: Map<string, string>, energy: number): string {
  let result = '';
  const sortedEntries = Array.from(amphipods.entries()).sort((a, b) =>
    a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : a[0] < b[0] ? -1 : 1
  );
  for (const item of sortedEntries) {
    result += item[1] + ':' + item[0] + ',' + energy;
  }

  return result;
}

function printState(amphipods: Map<string, string>) {
  let state = '';
  state += '#############\n';
  state += '#' + getPositions(amphipods, 1, 11, 1, '.') + '#\n';
  state += '#' + getPositions(amphipods, 1, 11, 2, '#') + '#\n';
  state += '#' + getPositions(amphipods, 1, 11, 3, '#') + '#\n';
  state += '#' + getPositions(amphipods, 1, 11, 4, '#') + '#\n';
  state += '#' + getPositions(amphipods, 1, 11, 5, '#') + '#\n';

  console.log(state);
}

function getPositions(amphipods: Map<string, string>, start: number, end: number, row: number, defaultValue: string) {
  let result = '';
  for (let i = start; i <= end; i++) {
    const amphipod = amphipods.get(row + ',' + i);
    if (amphipod) {
      result += amphipod;
    } else {
      if (defaultValue === '#' && (i === 3 || i === 5 || i === 7 || i === 9)) {
        result += '.';
      } else {
        result += defaultValue;
      }
    }
  }

  return result;
}

function splitInput(input: string, includeFoldedAmphipods: boolean): { amphipods: Map<string, string> } {
  const grid = input.split(/\r?\n/).map((i) => i.split(''));

  if (includeFoldedAmphipods && grid.length < 7) {
    grid.splice(3, 0, '  #D#C#B#A#  '.split(''));
    grid.splice(4, 0, '  #D#B#A#C#  '.split(''));
  }

  const amphipods = new Map<string, string>();

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] !== '.' && grid[r][c] !== '#' && grid[r][c] !== ' ') {
        amphipods.set(r + ',' + c, grid[r][c]);
      }
    }
  }

  return { amphipods };
}
