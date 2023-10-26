/** part 1 */
export function part1(input: string): number {
  const data = splitInput(input);

  const minX = Math.max(Math.min(...data.map((d) => d.pos.x1)), -50);
  const minY = Math.max(Math.min(...data.map((d) => d.pos.y1)), -50);
  const minZ = Math.max(Math.min(...data.map((d) => d.pos.z1)), -50);

  const maxX = Math.min(Math.max(...data.map((d) => d.pos.x2)), 50);
  const maxY = Math.min(Math.max(...data.map((d) => d.pos.y2)), 50);
  const maxZ = Math.min(Math.max(...data.map((d) => d.pos.z2)), 50);

  //console.log(minX, minY, minZ, maxX, maxY, maxZ);

  const cube: number[][][] = new Array(maxX - minX + 1);

  for (let x = 0; x < cube.length; x++) {
    cube[x] = new Array(maxY - minY + 1);
    for (let y = 0; y < cube[x].length; y++) {
      cube[x][y] = new Array(maxZ - minZ + 1).fill(0);
    }
  }

  let counter = 0;

  for (const item of data) {
    //console.log(item, counter);
    for (let x = Math.max(item.pos.x1, -50); x <= Math.min(item.pos.x2, 50); x++) {
      for (let y = Math.max(item.pos.y1, -50); y <= Math.min(item.pos.y2, 50); y++) {
        for (let z = Math.max(item.pos.z1, -50); z <= Math.min(item.pos.z2, 50); z++) {
          if (item.type === 'on' && cube[x - minX][y - minY][z - minZ] !== 1) {
            cube[x - minX][y - minY][z - minZ] = 1;
            counter++;
          } else if (item.type === 'off' && cube[x - minX][y - minY][z - minZ] !== 0) {
            cube[x - minX][y - minY][z - minZ] = 0;
            counter--;
          }
        }
      }
    }
  }

  return counter;
}

/** part 2 */
export function part2(input: string): number {
  const data = splitInput(input).reverse();

  let counter = 0;
  const previousCubes: Cube[] = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'on') {
      const size = getSize(data[i]);
      counter += size - getOverlappingArea(data[i], previousCubes.slice());

      console.log(
        i,
        'size',
        size,
        'overlapping',
        getOverlappingArea(data[i], previousCubes.slice()),
        previousCubes.slice()
      );
    }

    previousCubes.push(data[i]);
  }

  return counter;
}

function getOverlappingArea(cube: Cube, previousCubes: Cube[]): number {
  // find overlapping
  let volume = 0;

  for (let i = 0; i < previousCubes.length; i++) {
    const x1 = Math.max(cube.pos.x1, previousCubes[i].pos.x1);
    const x2 = Math.min(cube.pos.x2, previousCubes[i].pos.x2);
    const y1 = Math.max(cube.pos.y1, previousCubes[i].pos.y1);
    const y2 = Math.min(cube.pos.y2, previousCubes[i].pos.y2);
    const z1 = Math.max(cube.pos.z1, previousCubes[i].pos.z1);
    const z2 = Math.min(cube.pos.z2, previousCubes[i].pos.z2);
    const x = x2 - x1;
    const y = y2 - y1;
    const z = z2 - z1;

    if (x >= 0 && y >= 0 && z >= 0) {
      const overlappingCube: Cube = { type: cube.type, pos: { x1, x2, y1, y2, z1, z2 } };
      const size = getSize(overlappingCube);
      volume += size - getOverlappingArea(overlappingCube, previousCubes.slice(i + 1));
    }
  }

  return volume;
}

interface Cube {
  type: string;
  pos: { x1: number; x2: number; y1: number; y2: number; z1: number; z2: number };
}

function getSize(cube: Cube): number {
  return (cube.pos.x2 - cube.pos.x1 + 1) * (cube.pos.y2 - cube.pos.y1 + 1) * (cube.pos.z2 - cube.pos.z1 + 1);
}

function splitInput(input: string): Cube[] {
  return input.split(/\r?\n/).map((i) => {
    const row = i.split(' ');
    const pos = row[1].split(',').map((r) => r.split('=')[1].split('..'));

    return {
      type: row[0],
      pos: {
        x1: parseInt(pos[0][0]),
        x2: parseInt(pos[0][1]),
        y1: parseInt(pos[1][0]),
        y2: parseInt(pos[1][1]),
        z1: parseInt(pos[2][0]),
        z2: parseInt(pos[2][1]),
      },
    };
  });
}
