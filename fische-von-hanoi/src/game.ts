export class Game {
  gameGrid: Array<string[]>;
  selected: { x: number; y: number } | null = null;

  private pointsContainer: HTMLDivElement;

  constructor(private container: HTMLDivElement) {
    this.gameGrid = new Array<string[]>(4);
    this.gameGrid[0] = '#...........#'.split('');
    this.gameGrid[1] = '###B#C#B#D###'.split('');
    this.gameGrid[2] = '###A#D#C#A###'.split('');
    this.gameGrid[3] = '#############'.split('');

    this.initialize();
  }

  private initialize(): void {
    for (let y = 0; y < this.gameGrid.length; y++) {
      for (let x = 0; x < this.gameGrid[y].length; x++) {
        const div = document.createElement('div');

        if (this.gameGrid[y][x] === '#') {
          div.classList.add('barrel');
        } else {
          div.classList.add('tile');
          div.dataset.x = x.toString();
          div.dataset.y = y.toString();
          div.onclick = (event) => this.clickTile(event);
        }

        this.container.appendChild(div);
        this.updateDiv(y, x);
      }
    }

    this.pointsContainer = document.createElement('div');
    this.pointsContainer.classList.add('points');
    this.pointsContainer.innerText = '27';
    this.container.appendChild(this.pointsContainer);
  }

  private clickTile(event: MouseEvent): void {
    const div = <HTMLDivElement>(<HTMLDivElement>event.target).closest('.tile');
    const x = parseInt(div.dataset.x);
    const y = parseInt(div.dataset.y);
    console.log(x, y);

    if (this.isAnimal(y, x)) {
      // select animal
      if (this.selected && (this.selected.x !== x || this.selected.y !== y)) {
        const previousSelected = this.selected;
        this.selected = null;
        this.updateDiv(previousSelected.y, previousSelected.x);
      }

      this.selected = { x: x, y: y };
      this.updateDiv(y, x);
    } else {
      // move animal
      if (this.selected) {
        // TODO: check path
        const previousSelected = this.selected;
        this.selected = null;

        this.gameGrid[y][x] =
          this.gameGrid[previousSelected.y][previousSelected.x];
        this.gameGrid[previousSelected.y][previousSelected.x] = '.';

        this.updateDiv(previousSelected.y, previousSelected.x);
        this.updateDiv(y, x);

        // TODO: check if finished
      }
    }
  }

  private updateDiv(y: number, x: number): void {
    // find div and remove all children
    const div = this.container.children[y * 13 + x];
    while (div.lastChild) {
      div.removeChild(div.lastChild);
    }

    div.classList.remove('selected');

    // add animal
    if (this.isAnimal(y, x)) {
      const animal = document.createElement('div');
      animal.classList.add('animal');
      animal.classList.add('animal-' + this.gameGrid[y][x].toLowerCase());

      if (this.selected && this.selected.x === x && this.selected.y === y) {
        div.classList.add('selected');
      }

      div.appendChild(animal);
    }

    // set target
    if (y === 1 || y === 2) {
      if (x === 3) {
        const target = document.createElement('div');
        target.classList.add('target-a');
        div.appendChild(target);
      } else if (x === 5) {
        const target = document.createElement('div');
        target.classList.add('target-b');
        div.appendChild(target);
      } else if (x === 7) {
        const target = document.createElement('div');
        target.classList.add('target-c');
        div.appendChild(target);
      } else if (x === 9) {
        const target = document.createElement('div');
        target.classList.add('target-d');
        div.appendChild(target);
      }
    }
  }

  private isAnimal(y: number, x: number): boolean {
    return (
      this.gameGrid[y][x] === 'A' ||
      this.gameGrid[y][x] === 'B' ||
      this.gameGrid[y][x] === 'C' ||
      this.gameGrid[y][x] === 'D'
    );
  }
}
