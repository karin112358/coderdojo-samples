interface Card {
  numbers: Map<number, CardItem>;
  details: CardDetails;
  won: boolean;
}

interface CardItem {
  row: number;
  col: number;
  marked: boolean;
}

interface CardDetails {
  rows: number[];
  cols: number[];
}

/** part 1 */
export function part1(input: string): number {
  const { numbers, cards, resultLength } = splitInput(input);

  let finished = false;
  let response = 0;

  // check numbers
  for (const number of numbers) {
    if (!finished) {
      for (const card of cards) {
        if (card.numbers.has(number)) {
          const item = card.numbers.get(number);
          if (item) {
            item.marked = true;
            card.details.rows[item.row]++;
            card.details.cols[item.col]++;

            if (card.details.rows[item.row] === resultLength || card.details.cols[item.col] === resultLength) {
              let result = 0;
              card.numbers.forEach((value, key) => {
                if (!value.marked) {
                  result += key;
                }
              });

              finished = true;
              response = result * number;
            }
          }
        }
      }
    }
  }

  return response;
}

/** part 2 */
export function part2(input: string): number {
  const { numbers, cards, resultLength } = splitInput(input);

  let boardsWon = 0;
  let response = 0;

  // check numbers
  for (const number of numbers) {
    for (const card of cards) {
      if (!card.won) {
        if (card.numbers.has(number)) {
          const item = card.numbers.get(number);
          if (item) {
            item.marked = true;
            card.details.rows[item.row]++;
            card.details.cols[item.col]++;

            if (card.details.rows[item.row] === resultLength || card.details.cols[item.col] === resultLength) {
              card.won = true;
              boardsWon++;

              if (boardsWon === cards.length) {
                let result = 0;
                card.numbers.forEach((value, key) => {
                  if (!value.marked) {
                    result += key;
                  }
                });

                response = result * number;
              }
            }
          }
        }
      }
    }
  }

  return response;
}

function splitInput(input: string): {
  numbers: number[];
  cards: Card[];
  resultLength: number;
} {
  const inputParts = input.split(/\r?\n\r?\n/).filter((i) => !!i);

  const numbers = inputParts[0].split(',').map((n) => parseInt(n));
  let resultLength = 0;

  // build cards
  const cards: Card[] = new Array(inputParts.length - 1);

  for (let i = 1; i < inputParts.length; i++) {
    console.log('card', i, inputParts[i]);
    const rows = inputParts[i].split(/\r?\n/).filter((r) => r);

    cards[i - 1] = {
      numbers: new Map<number, CardItem>(),
      details: { rows: Array(rows.length).fill(0), cols: [] },
      won: false,
    };

    resultLength = rows.length;

    for (let r = 0; r < rows.length; r++) {
      const cols = rows[r].split(/\s+/);

      cards[i - 1].details.cols = Array(cols.length).fill(0);

      for (let c = 0; c < cols.length; c++) {
        cards[i - 1].numbers.set(parseInt(cols[c]), {
          row: r,
          col: c,
          marked: false,
        });
      }
    }
  }

  return { numbers: numbers, cards: cards, resultLength: resultLength };
}
