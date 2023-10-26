/** part 1 */
export function part1(input: string): number {
  const data = splitInput(input);
  const cycles = 50;
  const darkArea = 52;

  const sliceY = 100;
  const sliceX = 50;

  // build array
  let image = createEmptyArray(data.image.length + cycles * darkArea * 2, data.image[0].length + cycles * darkArea * 2);
  console.log(data.image.length, data.image[0].length, image.length, image[0].length, image[0][100], image[0][111]);

  console.log(image.slice(sliceY).map((i) => i.slice(sliceX).join('')));

  // copy image
  for (let r = cycles * darkArea; r < image.length - cycles * darkArea; r++) {
    for (let c = cycles * darkArea; c < image[r].length - cycles * darkArea; c++) {
      image[r][c] = data.image[r - cycles * darkArea][c - cycles * darkArea];
    }
  }

  //console.log(image.slice(sliceY).map((i) => i.slice(sliceX).join('')));
  let counter = 0;

  // cycles
  for (let i = 0; i < cycles; i++) {
    console.log('cycle', i);
    const outputImage = createEmptyArray(image.length, image[0].length);

    for (let r = 2; r < image.length - 2; r++) {
      for (let c = 2; c < image[c].length - 2; c++) {
        // get binary number
        let binaryNumber = '';
        for (let y = -1; y <= 1; y++) {
          for (let x = -1; x <= 1; x++) {
            binaryNumber += image[r + y][c + x] === '#' ? '1' : '0';
          }
        }

        // replace
        //console.log(r, c, image[r][c], binaryNumber, parseInt(binaryNumber, 2), data.iea[parseInt(binaryNumber, 2)]);
        const newPixel = data.iea[parseInt(binaryNumber, 2)];

        outputImage[r][c] = newPixel;
      }
    }

    image = outputImage;
    //border -= 2;
    //console.log(image.slice(80).map((i) => i.slice(0, 50).join('')));
  }

  // count
  counter = 0;
  for (let r = darkArea; r < image.length - darkArea; r++) {
    for (let c = darkArea; c < image[r].length - darkArea; c++) {
      if (image[r][c] === '#') {
        counter++;
      }
    }
  }

  console.log(counter);

  return counter;
}

/** part 2 */
export function part2(input: string): number {
  return 0;
}

function createEmptyArray(r: number, c: number): string[][] {
  const image = new Array(r);
  for (let r = 0; r < image.length; r++) {
    image[r] = new Array(c).fill('.');
  }
  return image;
}

function splitInput(input: string): { iea: string; image: string[][] } {
  const data = input.split(/\r?\n\r?\n/);
  return { iea: data[0].replace(/\r?\n/g, ''), image: data[1].split(/\r?\n/).map((line) => line.split('')) };
}
