// prepare rotations
let shifts: { shift: [number, number, number]; rotation: number }[] = [];
const rotations: Map<string, [number, number, number][]> = new Map();

const rotationCounter: [number, number, number][] = new Array(24);
let point = <[number, number, number]>[1, 2, 3];
const rotationResults: [number, number, number][] = [];
let version = 0;

for (let x = 0; x < 4; x++) {
  if (x > 0) {
    point = rotateX(point);
  }
  for (let y = 0; y < 4; y++) {
    if (y > 0) {
      point = rotateY(point);
    }
    for (let z = 0; z < 4; z++) {
      if (z > 0) {
        point = rotateZ(point);
      }

      if (!rotationResults.find((p) => p[0] === point[0] && p[1] === point[1] && p[2] === point[2])) {
        rotationResults.push(point);

        rotationCounter[version] = [x, y, z];
        version++;
      }
    }

    point = rotateZ(point);
  }
  point = rotateY(point);
}

console.log(rotationCounter);

/** part 1 */
export function part1(input: string): number {
  const data = splitInput(input);
  shifts = [];

  while (data.length > 1) {
    let newResult: [number, number, number][] | null = null;
    for (let i = 1; i < data.length && !newResult; i++) {
      //console.log('compare', i);
      console.log('try match', 0, i);
      newResult = findPair(data[0], data[i]);

      if (newResult) {
        console.log('match', 0, i, 'length', data.length);
        data[0] = newResult;
        data.splice(i, 1);
      }
    }
  }

  return data[0].length;
}

/** part 2 */
export function part2(input: string): number {
  const data = splitInput(input);
  shifts = [];

  while (data.length > 1) {
    let newResult: [number, number, number][] | null = null;
    for (let i = 1; i < data.length && !newResult; i++) {
      //console.log('compare', i);
      newResult = findPair(data[0], data[i]);

      if (newResult) {
        console.log('match', 0, i, 'length', data.length);
        data[0] = newResult;
        data.splice(i, 1);
      }
    }
  }

  console.log('shifts', shifts);

  let max = 0;
  for (let i = 0; i < shifts.length - 1; i++) {
    for (let j = 0; j < shifts.length; j++) {
      if (i !== j) {
        const dist =
          Math.abs(shifts[i].shift[0] - shifts[j].shift[0]) +
          Math.abs(shifts[i].shift[1] - shifts[j].shift[1]) +
          Math.abs(shifts[i].shift[2] - shifts[j].shift[2]);

        if (dist > max) {
          max = dist;
        }
      }
    }
  }

  console.log('max', max);

  return max;
}

export function findPair(
  scanner1: [number, number, number][],
  scanner2: [number, number, number][]
): [number, number, number][] | null {
  // rotate points
  const scanner2Ext = scanner2.map((i) => rotate(i));
  let foundMatch = false;

  let s1 = 0;
  let s2 = 0;
  let v2 = 0;
  let shiftX = 0;
  let shiftY = 0;
  let shiftZ = 0;
  let points1: [number, number, number][] = [];
  let points2: [number, number, number][] = [];
  for (s1 = 0; s1 < scanner1.length && !foundMatch; s1++) {
    for (s2 = 0; s2 < scanner2Ext.length && !foundMatch; s2++) {
      for (v2 = 0; v2 < scanner2Ext[0].length && !foundMatch; v2++) {
        // shift positions for 2. scanner
        shiftX = scanner2Ext[s2][v2][0] - scanner1[s1][0];
        shiftY = scanner2Ext[s2][v2][1] - scanner1[s1][1];
        shiftZ = scanner2Ext[s2][v2][2] - scanner1[s1][2];

        points1 = scanner1;
        points2 = scanner2Ext.map((s) => shiftPoint(s[v2], shiftX, shiftY, shiftZ));

        // find pairs
        const matches = points1.filter((p1) =>
          points2.find((p2) => p1[0] === p2[0] && p1[1] === p2[1] && p1[2] === p2[2])
        );

        if (matches.length >= 12) {
          //console.log('MATCH', s1, s2, v1, v2, 'shift', shiftX, shiftY, shiftZ, matches);
          foundMatch = true;
        }
      }
    }
  }

  if (foundMatch) {
    const shift = <[number, number, number]>[shiftX, shiftY, shiftZ];
    shifts.push({ shift: shift, rotation: v2 });

    // return new scanner data for merged area
    const result = points1;
    for (const point of points2) {
      // check if shifted point already exists

      if (!result.find((p) => p[0] === point[0] && p[1] === point[1] && p[2] === point[2])) {
        result.push(point);
      }
    }

    //console.log(result);

    return result;
  } else {
    return null;
  }
}

function shiftPoint(point: [number, number, number], x: number, y: number, z: number): [number, number, number] {
  return <[number, number, number]>[point[0] - x, point[1] - y, point[2] - z];
}

export function rotate(point: [number, number, number]): [number, number, number][] {
  const key = point[0].toString() + ',' + point[1].toString() + ',' + point[2].toString();

  if (rotations.has(key)) {
    return rotations.get(key)!;
  } else {
    const result: [number, number, number][] = [];
    let index = 0;
    let newPoint = <[number, number, number]>[point[0], point[1], point[2]];

    for (let x = 0; x < 4 && index < rotationCounter.length; x++) {
      if (x > 0) {
        newPoint = rotateX(newPoint);
      }
      for (let y = 0; y < 4 && index < rotationCounter.length; y++) {
        if (y > 0) {
          newPoint = rotateY(newPoint);
        }
        for (let z = 0; z < 4 && index < rotationCounter.length; z++) {
          if (z > 0) {
            newPoint = rotateZ(newPoint);
          }

          if (rotationCounter[index][0] === x && rotationCounter[index][1] === y && rotationCounter[index][2] === z) {
            result.push(newPoint);
            index++;
          }
        }

        newPoint = rotateZ(newPoint);
      }

      newPoint = rotateY(newPoint);
    }

    rotations.set(key, result);
    return result;
  }

  //console.log(result);
}

function rotateX(point: [number, number, number]): [number, number, number] {
  return <[number, number, number]>[point[1], -point[0], point[2]];
}

function rotateY(point: [number, number, number]): [number, number, number] {
  return <[number, number, number]>[point[2], point[1], -point[0]];
}

function rotateZ(point: [number, number, number]): [number, number, number] {
  return <[number, number, number]>[point[0], point[2], -point[1]];
}

export function splitInput(input: string): [number, number, number][][] {
  return input.split(/\r?\n\r?\n/).map((i) =>
    i
      .split(/\r?\n/)
      .slice(1)
      .map((i) => <[number, number, number]>i.split(',').map((i) => parseInt(i)))
  );
}
