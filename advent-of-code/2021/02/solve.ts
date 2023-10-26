/** part 1 */
export function part1(input: string): number {
  const commands = splitInput(input);

  let depth = 0;
  let forward = 0;
  
  for (const command of commands) {
    if (command.direction === 'forward') {
      forward += command.amount;
    } else if (command.direction === 'up') {
      depth -= command.amount;
    } else if (command.direction === 'down') {
      depth += command.amount;
    }
  }

  return depth * forward;
}

/** part 2 */
export function part2(input: string): number {
  const commands = splitInput(input);

  let depth = 0;
  let forward = 0;
  let aim = 0;
  
  for (const command of commands) {
    if (command.direction === 'forward') {
      forward += command.amount;
      depth += aim * command.amount;
    } else if (command.direction === 'up') {
      aim -= command.amount;
    } else if (command.direction === 'down') {
      aim += command.amount;
    }
  }

  return depth * forward;
}

function splitInput(input: string): { direction: string; amount: number }[] {
  return input
    .split(/\r?\n/)
    .filter((i) => !!i)
    .map((i) => {
      const command = i.split(' ');
      return { direction: command[0], amount: parseInt(command[1]) };
    });
}
