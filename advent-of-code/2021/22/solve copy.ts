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

/** part 1 */
export function part2y(input: string): number {
  const data = splitInput(input);

  // const minX = Math.min(...data.map((d) => d.pos.x1));
  // const minY = Math.min(...data.map((d) => d.pos.y1));
  // const minZ = Math.min(...data.map((d) => d.pos.z1));

  // const maxX = Math.max(...data.map((d) => d.pos.x2));
  // const maxY = Math.max(...data.map((d) => d.pos.y2));
  // const maxZ = Math.max(...data.map((d) => d.pos.z2));

  // console.log(minX, minY, minZ, maxX, maxY, maxZ);

  let counter = 0;
  for (let i = 0; i < data.length; i++) {
    console.log('process', data[i]);
    if (data[i].type === 'on') {
      let size =
        (data[i].pos.x2 - data[i].pos.x1 + 1) *
        (data[i].pos.y2 - data[i].pos.y1 + 1) *
        (data[i].pos.z2 - data[i].pos.z1 + 1);

      console.log('\tadd', size);
      counter += size;

      // find overlapping
      for (let j = 0; j < i; j++) {
        console.log('\tremove overlapping', i, data[i].pos, j, data[j].pos);
        if (data[j].type === 'on') {
          let x = Math.min(data[i].pos.x2, data[j].pos.x2) - Math.max(data[i].pos.x1, data[j].pos.x1);
          let y = Math.min(data[i].pos.y2, data[j].pos.y2) - Math.max(data[i].pos.y1, data[j].pos.y1);
          let z = Math.min(data[i].pos.z2, data[j].pos.z2) - Math.max(data[i].pos.z1, data[j].pos.z1);

          console.log(x, y, z);

          if (x >= 0 && y >= 0 && z >= 0) {
            let size = (x + 1) * (y + 1) * (z + 1);
            console.log('\t\tremove', size);
            counter -= size;
          }
        }
      }
    }
  }

  return counter;
}

/** part 2 */
export function part2x(input: string): number {
  const data = splitInput(input);

  let rangeX = [
    ...new Set(
      data
        .map((d) => d.pos.x1)
        .concat(...data.map((d) => d.pos.x2))
        .sort((a, b) => a - b)
    ),
  ];
  let rangeY = [
    ...new Set(
      data
        .map((d) => d.pos.y1)
        .concat(...data.map((d) => d.pos.y2))
        .sort((a, b) => a - b)
    ),
  ];
  let rangeZ = [
    ...new Set(
      data
        .map((d) => d.pos.z1)
        .concat(...data.map((d) => d.pos.z2))
        .sort((a, b) => a - b)
    ),
  ];

  //console.log(rangeX.length, rangeY.length, rangeZ.length);

  const newRangeX: number[] = [];
  for (let i = 0; i < rangeX.length; i++) {
    if (!newRangeX.includes(rangeX[i])) {
      newRangeX.push(rangeX[i]);
    }

    if (i > 0 && i < rangeX.length - 1 && !newRangeX.includes(rangeX[i] - 1)) {
      newRangeX.push(rangeX[i] - 1);
    }

    if (i > 0 && i < rangeX.length - 1 && !newRangeX.includes(rangeX[i] + 1)) {
      newRangeX.push(rangeX[i] + 1);
    }
  }

  const newRangeY: number[] = [];
  for (let i = 0; i < rangeY.length; i++) {
    if (!newRangeY.includes(rangeY[i])) {
      newRangeY.push(rangeY[i]);
    }

    if (i > 0 && i < rangeY.length - 1 && !newRangeY.includes(rangeY[i] - 1)) {
      newRangeY.push(rangeY[i] - 1);
    }

    if (i > 0 && i < rangeY.length - 1 && !newRangeY.includes(rangeY[i] + 1)) {
      newRangeY.push(rangeY[i] + 1);
    }
  }

  const newRangeZ: number[] = [];
  for (let i = 0; i < rangeZ.length; i++) {
    if (!newRangeZ.includes(rangeZ[i])) {
      newRangeZ.push(rangeZ[i]);
    }

    if (i > 0 && i < rangeZ.length - 1 && !newRangeZ.includes(rangeZ[i] - 1)) {
      newRangeZ.push(rangeZ[i] - 1);
    }

    if (i > 0 && i < rangeZ.length - 1 && !newRangeZ.includes(rangeZ[i] + 1)) {
      newRangeZ.push(rangeZ[i] + 1);
    }
  }

  rangeX = [...new Set(newRangeX.sort((a, b) => a - b))];
  rangeY = [...new Set(newRangeY.sort((a, b) => a - b))];
  rangeZ = [...new Set(newRangeZ.sort((a, b) => a - b))];

  console.log(rangeX, rangeY, rangeZ);

  const cube: number[][][] = new Array(rangeX.length);

  for (let x = 0; x < cube.length; x++) {
    cube[x] = new Array(rangeY.length);
    for (let y = 0; y < cube[x].length; y++) {
      cube[x][y] = new Array(rangeZ.length).fill(0);
    }
  }

  // resolve on / off
  for (const item of data) {
    //console.log(item, counter);
    let x = item.pos.x1;
    while (x < item.pos.x2) {
      const indexX = rangeX.indexOf(x);
      let y = item.pos.y1;

      while (y < item.pos.y2) {
        const indexY = rangeY.indexOf(y);
        let z = item.pos.z1;

        while (z < item.pos.z2) {
          const indexZ = rangeZ.indexOf(z);

          if (item.type === 'on' && cube[indexX][indexY][indexZ] !== 1) {
            //console.log('on', x, y, z);
            cube[indexX][indexY][indexZ] = 1;
          } else if (item.type === 'off' && cube[indexX][indexY][indexZ] !== 0) {
            cube[indexX][indexY][indexZ] = 0;
          }

          z = rangeZ[indexZ + 1];
        }

        y = rangeY[indexY + 1];
      }

      x = rangeX[indexX + 1];
    }
  }

  let counter = 0;

  console.log(rangeZ);

  //console.log(cube);

  // count
  for (let x = 0; x < cube.length; x++) {
    for (let y = 0; y < cube[x].length; y++) {
      for (let z = 0; z < cube[x][y].length; z++) {
        if (cube[x][y][z] === 1) {
          const x1 = rangeX[x];
          let x2 = rangeX[x + 1];
          if (!x2) x2 = x1 + 1;

          const y1 = rangeY[y];
          let y2 = rangeY[y + 1];
          if (!y2) y2 = y1 + 1;

          const z1 = rangeZ[z];
          let z2 = rangeZ[z + 1];
          if (!z2) z2 = z1 + 1;

          // const size =
          //   (x2 - x1 + (x === 0 || cube[x - 1][y][z] === 1 ? 1 : 0)) *
          //   (y2 - y1 + (y === 0 || cube[x][y - 1][z] === 1 ? 1 : 0)) *
          //   (z2 - z1 + (z === 0 || cube[x][y][z - 1] === 1 ? 1 : 0));

          const size = (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1);

          // console.log(x, y, z);
          console.log('\t', x1, x2, y1, y2, z1, z2, ' -> ', size);

          counter += size;
        }
      }
    }
  }

  console.log('counter', counter);
  return counter;
}

interface Cube {
  type: string;
  pos: { x1: number; x2: number; y1: number; y2: number; z1: number; z2: number };
}

export function part2(input: string): number {
  const data = splitInput(input);

  let rangeX = [
    ...new Set(
      data
        .map((d) => d.pos.x1)
        .concat(...data.map((d) => d.pos.x2))
        .sort((a, b) => a - b)
    ),
  ];
  let rangeY = [
    ...new Set(
      data
        .map((d) => d.pos.y1)
        .concat(...data.map((d) => d.pos.y2))
        .sort((a, b) => a - b)
    ),
  ];
  let rangeZ = [
    ...new Set(
      data
        .map((d) => d.pos.z1)
        .concat(...data.map((d) => d.pos.z2))
        .sort((a, b) => a - b)
    ),
  ];

  const newRangeX: number[] = [];
  for (let i = 0; i < rangeX.length; i++) {
    if (!newRangeX.includes(rangeX[i])) {
      newRangeX.push(rangeX[i]);
    }

    if (i > 0 && i < rangeX.length - 1 && !newRangeX.includes(rangeX[i] - 1)) {
      newRangeX.push(rangeX[i] - 1);
    }

    if (i > 0 && i < rangeX.length - 1 && !newRangeX.includes(rangeX[i] + 1)) {
      newRangeX.push(rangeX[i] + 1);
    }
  }

  const newRangeY: number[] = [];
  for (let i = 0; i < rangeY.length; i++) {
    if (!newRangeY.includes(rangeY[i])) {
      newRangeY.push(rangeY[i]);
    }

    if (i > 0 && i < rangeY.length - 1 && !newRangeY.includes(rangeY[i] - 1)) {
      newRangeY.push(rangeY[i] - 1);
    }

    if (i > 0 && i < rangeY.length - 1 && !newRangeY.includes(rangeY[i] + 1)) {
      newRangeY.push(rangeY[i] + 1);
    }
  }

  const newRangeZ: number[] = [];
  for (let i = 0; i < rangeZ.length; i++) {
    if (!newRangeZ.includes(rangeZ[i])) {
      newRangeZ.push(rangeZ[i]);
    }

    if (i > 0 && i < rangeZ.length - 1 && !newRangeZ.includes(rangeZ[i] - 1)) {
      newRangeZ.push(rangeZ[i] - 1);
    }

    if (i > 0 && i < rangeZ.length - 1 && !newRangeZ.includes(rangeZ[i] + 1)) {
      newRangeZ.push(rangeZ[i] + 1);
    }
  }

  rangeX = [...new Set(newRangeX.sort((a, b) => a - b))];
  rangeY = [...new Set(newRangeY.sort((a, b) => a - b))];
  rangeZ = [...new Set(newRangeZ.sort((a, b) => a - b))];

  console.log(rangeX, rangeY, rangeZ);

  let cubes = data;
  let newCubes: Cube[] = [];

  // console.log(
  //   'cubes before split',
  //   cubes.map((c) => [c, getSize(c)])
  // );

  // split cubes x
  for (const cube of cubes) {
    //console.log('cube', cube);
    let posX = cube.pos.x1;

    // TODO: can last split be removed
    for (let splitX of rangeX) {
      //console.log('\tsplitX', splitX);

      if (cube.pos.x1 < splitX && cube.pos.x2 >= splitX) {
        newCubes.push({
          type: cube.type,
          pos: { x1: posX, x2: splitX - 1, y1: cube.pos.y1, y2: cube.pos.y2, z1: cube.pos.z1, z2: cube.pos.z2 },
        });
        posX = splitX;
      }
    }

    // add last section
    newCubes.push({
      type: cube.type,
      pos: { x1: posX, x2: cube.pos.x2, y1: cube.pos.y1, y2: cube.pos.y2, z1: cube.pos.z1, z2: cube.pos.z2 },
    });
  }
  //console.log('all cubes', newCubes);

  cubes = JSON.parse(JSON.stringify(newCubes));
  newCubes = [];
  console.log(
    'cubes after splitX',
    cubes.map((c) => [c, getSize(c)])
  );
  console.log('cubes after split X', cubes.length);

  // split cubes y
  for (const cube of cubes) {
    let posY = cube.pos.y1;

    // TODO: can last split be removed
    for (const splitY of rangeY) {
      if (cube.pos.y1 < splitY && cube.pos.y2 >= splitY) {
        newCubes.push({
          type: cube.type,
          pos: { x1: cube.pos.x1, x2: cube.pos.x2, y1: posY, y2: splitY - 1, z1: cube.pos.z1, z2: cube.pos.z2 },
        });
        posY = splitY;
      }
    }

    // add last section
    newCubes.push({
      type: cube.type,
      pos: { x1: cube.pos.x1, x2: cube.pos.x2, y1: posY, y2: cube.pos.y2, z1: cube.pos.z1, z2: cube.pos.z2 },
    });
  }

  cubes = JSON.parse(JSON.stringify(newCubes));
  newCubes = [];
  // console.log(
  //   'cubes after splitY',
  //   cubes.map((c) => [c, getSize(c)])
  // );
  // find duplicates

  console.log('cubes after split Y', cubes);

  // split cubes z
  for (const cube of cubes) {
    let posZ = cube.pos.z1;

    // TODO: can last split be removed
    for (let splitZ of rangeZ) {
      if (cube.pos.z1 < splitZ && cube.pos.z2 >= splitZ) {
        newCubes.push({
          type: cube.type,
          pos: { x1: cube.pos.x1, x2: cube.pos.x2, y1: cube.pos.y1, y2: cube.pos.y2, z1: posZ, z2: splitZ - 1 },
        });
        posZ = splitZ;
      }
    }

    // add last section
    newCubes.push({
      type: cube.type,
      pos: { x1: cube.pos.x1, x2: cube.pos.x2, y1: cube.pos.y1, y2: cube.pos.y2, z1: posZ, z2: cube.pos.z2 },
    });
  }
  cubes = newCubes;
  // console.log(
  //   'cubes after splitZ',
  //   cubes.map((c) => [c, getSize(c)])
  // );
  console.log('cubes after split Z', cubes.length);

  // count
  let counter = 0;
  const counted = new Set<string>();

  for (const cube of cubes) {
    const key = getKey(cube);
    if (!counted.has(key)) {
      // add
      if (cube.type === 'on') {
        const size = getSize(cube);
        counter += size;
      }

      counted.add(key);
    } else {
      // already added
      if (cube.type === 'off') {
        const size = getSize(cube);
        counter -= size;
        counted.delete(key);
      }
    }
  }

  console.log('counter', counter);
  return counter;
}

function getSize(cube: Cube): number {
  return (cube.pos.x2 - cube.pos.x1 + 1) * (cube.pos.y2 - cube.pos.y1 + 1) * (cube.pos.z2 - cube.pos.z1 + 1);
}

function getKey(cube: Cube): string {
  return (
    cube.pos.x1 + '-' + cube.pos.x2 + '-' + cube.pos.y1 + '-' + cube.pos.y2 + '-' + cube.pos.z1 + '-' + cube.pos.z2
  );
}

function getExtendedKey(cube: Cube): string {
  return (
    cube.type +
    '-' +
    cube.pos.x1 +
    '-' +
    cube.pos.x2 +
    '-' +
    cube.pos.y1 +
    '-' +
    cube.pos.y2 +
    '-' +
    cube.pos.z1 +
    '-' +
    cube.pos.z2
  );
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
