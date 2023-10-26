interface State {
  position: number;
  score: number;
}

/** part 1 */
export function part1(input: string): number {
  const startPositions = splitInput(input);
  const state: State[] = [
    { position: startPositions[0] - 1, score: 0 },
    { position: startPositions[1] - 1, score: 0 },
  ];

  console.log(state);
  let dice = 0;
  let diceRolled = 0;
  let winner = false;
  let loserScore = 0;

  while (!winner) {
    for (let s = 0; s < state.length && !winner; s++) {
      // roll dice
      let diceSum = 0;
      for (let i = 0; i < 3; i++) {
        dice++;
        diceRolled++;

        if (dice === 101) {
          dice = 1;
        }

        diceSum += dice;
      }

      state[s].position = (state[s].position + diceSum) % 10;
      state[s].score += state[s].position + 1;

      // check winner
      if (state[s].score >= 1000) {
        winner = true;
        loserScore = state[(s + 1) % 2].score;
        break;
      }
    }
  }

  return loserScore * diceRolled;
}

function getKey(universeState: UniverseState): string {
  return (
    universeState.player.toString() +
    ',' +
    universeState.state[0].position.toString() +
    ',' +
    universeState.state[1].position.toString() +
    ',' +
    universeState.state[0].score.toString() +
    ',' +
    universeState.state[1].score.toString()
  );
}

interface UniverseState {
  player: number;
  state: State[];
}

/** part 2 */
export function part2(input: string): number {
  const startPositions = splitInput(input);
  const winCount = [0, 0];

  const startUniverse: UniverseState = {
    player: 0,
    state: [
      { position: startPositions[0] - 1, score: 0 },
      { position: startPositions[1] - 1, score: 0 },
    ],
  };

  const diceResults = new Map<number, number>();
  for (let d1 = 1; d1 <= 3; d1++) {
    for (let d2 = 1; d2 <= 3; d2++) {
      for (let d3 = 1; d3 <= 3; d3++) {
        const diceSum = d1 + d2 + d3;
        if (diceResults.has(diceSum)) {
          diceResults.set(diceSum, diceResults.get(diceSum)! + 1);
        } else {
          diceResults.set(diceSum, 1);
        }
      }
    }
  }

  //console.log(diceResults);

  let universes = new Map<string, UniverseState>();
  let universesCount = new Map<string, number>();
  const winScore = 21;

  const key = getKey(startUniverse);
  universes.set(key, startUniverse);
  universesCount.set(key, 1);

  let mapHasEntries = true;

  while (mapHasEntries) {
    mapHasEntries = false;
    const newUniverses = new Map<string, UniverseState>();
    const newUniversesCount = new Map<string, number>();

    for (const [key, universeState] of universes.entries()) {
      mapHasEntries = true;

      // roll dice
      for (const [diceSum, count] of diceResults.entries()) {
        const newUniverseState = JSON.parse(JSON.stringify(universeState));
        const newState = newUniverseState.state[newUniverseState.player];

        newState.position = (newState.position + diceSum) % 10;
        newState.score += newState.position + 1;
        newUniverseState.player = (newUniverseState.player + 1) % 2;

        // check winner
        if (newUniverseState.state[0].score >= winScore) {
          winCount[0] += (universesCount.get(key) ?? 0) * count;
        } else if (newUniverseState.state[1].score >= winScore) {
          winCount[1] += (universesCount.get(key) ?? 0) * count;
        } else {
          const newUniverseKey = getKey(newUniverseState);
          if (!newUniverses.has(newUniverseKey)) {
            newUniverses.set(newUniverseKey, newUniverseState);
          }

          newUniversesCount.set(
            newUniverseKey,
            (universesCount.get(key) ?? 0) * count + (newUniversesCount.get(newUniverseKey) ?? 0)
          );
        }
      }
    }

    //console.log(universes.size)

    universes = newUniverses;
    universesCount = newUniversesCount;
  }

  return Math.max(...winCount);
}

function splitInput(input: string): number[] {
  const startPositions = input.split(/\r?\n/).map((i) => parseInt(i.split(': ')[1]));
  return startPositions;
}
