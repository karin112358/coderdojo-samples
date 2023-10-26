/** part 1 */
export function part1(input: string, isBinary = false): number {
  const binary = splitInput(input, isBinary);
  const result = parsePacket(binary);
  return result.version;
}

/** part 2 */
export function part2(input: string, isBinary = false): number {
  const binary = splitInput(input, isBinary);
  const result = parsePacket(binary);
  return result.value;
}

export function parsePacket(binary: string, level = 0): { version: number; packetLength: number; value: number } {
  // read packet
  let version = parseInt(binary.slice(0, 3), 2);
  const type = parseInt(binary.slice(3, 6), 2);

  if (type === 4) {
    let binaryNumber = '';

    let pos = 6;
    let last = false;
    while (!last) {
      last = binary[pos] === '0';
      binaryNumber += binary.slice(pos + 1, pos + 5);
      pos += 5;
    }

    const result = parseInt(binaryNumber, 2);
    //console.log(getIndent(level), 'literal', result);
    return { version: version, packetLength: pos, value: result };
  } else {
    const lengthType = parseInt(binary.slice(6, 7), 2);
    const packetValues = [];
    let packetLength = 0;

    //console.log(getIndent(level), 'operator', 'length type', lengthType, lengthType === 0 ? '15 bits' : '11 bits');

    if (lengthType === 0) {
      const length = parseInt(binary.slice(7, 7 + 15), 2);
      let pos = 0;

      while (pos < length) {
        const subPacket = binary.slice(pos + 7 + 15);
        const result = parsePacket(subPacket, level + 1);
        version += result.version;
        pos += result.packetLength;
        packetValues.push(result.value);
      }

      packetLength = 7 + 15 + length;
    } else {
      const numberOfSubPackets = parseInt(binary.slice(7, 7 + 11), 2);
      let pos = 18;

      for (let i = 0; i < numberOfSubPackets; i++) {
        const subPacket = binary.slice(pos);
        const result = parsePacket(subPacket, level + 1);
        pos += result.packetLength;
        version += result.version;
        packetValues.push(result.value);
      }

      packetLength = pos;
    }

    let value = 0;

    switch (type) {
      case 0:
        value = packetValues.reduce((prev, curr) => prev + curr, 0);
        break;
      case 1:
        value = packetValues.reduce((prev, curr) => prev * curr, 1);
        break;
      case 2:
        value = Math.min(...packetValues);
        break;
      case 3:
        value = Math.max(...packetValues);
        break;
      case 5:
        value = packetValues[0] > packetValues[1] ? 1 : 0;
        break;
      case 6:
        value = packetValues[0] < packetValues[1] ? 1 : 0;
        break;
      case 7:
        value = packetValues[0] == packetValues[1] ? 1 : 0;
        break;
    }

    return { version: version, packetLength: packetLength, value: value };

    // calculate aggregates
  }
}

function splitInput(input: string, isBinary = false): string {
  const chars = input.split('');
  let binary = '';

  // convert to binary
  if (isBinary) {
    binary = chars.join('');
  } else {
    for (const char of chars) {
      binary += ('0000' + parseInt(char, 16).toString(2)).substr(-4);
    }
  }

  return binary;
}

// function getIndent(level: number): string {
//   let result = '';
//   for (let i = 0; i < level; i++) {
//     result += '   ';
//   }

//   return result;
// }