/** part 1 */
export function part1(input: string): number {
  const targetArea = splitInput(input);
  return (targetArea.minY * (targetArea.minY + 1)) / 2;
}

/** part 2 */
export function part2(input: string): number {
  const targetArea = splitInput(input);
  let numberOfVelocities = 0;

  for (let velocityX = targetArea.maxX; velocityX > 0; velocityX--) {
    for (let velocityY = targetArea.minY; velocityY < Math.abs(targetArea.minY); velocityY++) {
      // calculate height
      let height = 0;
      let x = 0;
      let y = 0;
      let currVelocityX = velocityX;
      let currVelocityY = velocityY;
      let reachesTarget = false;

      while (x <= targetArea.maxX && y >= targetArea.minY) {
        x += currVelocityX;
        y += currVelocityY;

        if (y > height) height = y;

        if (x >= targetArea.minX && x <= targetArea.maxX && y >= targetArea.minY && y <= targetArea.maxY) {
          reachesTarget = true;
        }

        if (currVelocityX > 0) currVelocityX--;
        currVelocityY--;
      }

      if (reachesTarget) {
        numberOfVelocities++;
      }
    }
  }

  return numberOfVelocities;
}

function splitInput(input: string): { minX: number; maxX: number; minY: number; maxY: number } {
  const coordinates = input.split(': ')[1].split(', ');
  const x = coordinates[0].split('=')[1].split('..');
  const y = coordinates[1].split('=')[1].split('..');
  return { minX: parseInt(x[0]), maxX: parseInt(x[1]), minY: parseInt(y[0]), maxY: parseInt(y[1]) };
}
