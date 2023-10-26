import { readFileSync } from 'fs';
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
console.time();

// TODO: result should be 14510

class Room {
  // hallway: string[] = ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'];
  hallway: string[] = input[1]
    .replace(/\#/g, '')
    .split('')
    .map((x) => x.toLowerCase());
  aColumn: string[] = [input[3].charAt(3).toLowerCase(), input[2].charAt(3).toLowerCase()].filter((x) => x != '.');
  bColumn: string[] = [input[3].charAt(5).toLowerCase(), input[2].charAt(5).toLowerCase()].filter((x) => x != '.');
  cColumn: string[] = [input[3].charAt(7).toLowerCase(), input[2].charAt(7).toLowerCase()].filter((x) => x != '.');
  dColumn: string[] = [input[3].charAt(9).toLowerCase(), input[2].charAt(9).toLowerCase()].filter((x) => x != '.');
  cost: number = 0;
}
class Move {
  destination: 'a' | 'b' | 'c' | 'd';
  costs: number;
}
const entrances = [2, 4, 6, 8];
const roomSize = 2;
let visitedRooms = [];
let visitedRoomsCosts = [];

let room = new Room();
let minCost: number = Number.MAX_VALUE;
console.log(room);
makePossibleMoves(room);
console.log(minCost);
console.timeEnd();

function makePossibleMoves(room: Room) {
  if (room.hallway.filter((x) => x !== '.').length > 3) {
    return;
  }

  if (room.cost > minCost) return;

  if (visitedRooms.includes(convertToString(room))) {
    // let index = visitedRooms.indexOf(convertToString(room));
    // if (visitedRoomsCosts[index] <= room.cost) return;
    return;
  }

  visitedRooms.push(convertToString(room));
  visitedRoomsCosts.push(room.cost);

  if (
    room.aColumn.length == roomSize &&
    room.aColumn.every((x) => x == 'a') &&
    room.bColumn.length == roomSize &&
    room.bColumn.every((x) => x == 'b') &&
    room.cColumn.length == roomSize &&
    room.cColumn.every((x) => x == 'c') &&
    room.dColumn.length == roomSize &&
    room.dColumn.every((x) => x == 'd')
  ) {
    if (room.cost < minCost) {
      minCost = room.cost;
      console.log(minCost, room);
    }
  } else {
    if (minCost > 50000) console.log(convertToString(room), visitedRooms.length);

    // console.log(convertToString(room), visitedRooms.length);
    if (room.dColumn.some((x) => x != 'd')) {
      let directMove = findAvailableEntrances(room, getEntrance('d'), room.dColumn[room.dColumn.length - 1]);
      if (directMove != null) {
        let newRoom = moveToColumn(room, getEntrance('d'), directMove, 'd');
        makePossibleMoves(newRoom);
      } else {
        let move = findAvailableHallwayPositions(room, 'd');
        for (let i = 0; i < move.length; i++) {
          let newRoom = moveToHallway(room, move[i], 'd');
          makePossibleMoves(newRoom);
        }
      }
    }
    if (room.cColumn.some((x) => x != 'c')) {
      let directMove = findAvailableEntrances(room, getEntrance('c'), room.cColumn[room.cColumn.length - 1]);
      if (directMove != null) {
        let newRoom = moveToColumn(room, getEntrance('c'), directMove, 'c');
        makePossibleMoves(newRoom);
      } else {
        let move = findAvailableHallwayPositions(room, 'c');
        for (let i = 0; i < move.length; i++) {
          let newRoom = moveToHallway(room, move[i], 'c');
          makePossibleMoves(newRoom);
        }
      }
    }
    if (room.bColumn.some((x) => x != 'b')) {
      let directMove = findAvailableEntrances(room, getEntrance('b'), room.bColumn[room.bColumn.length - 1]);
      if (directMove != null) {
        let newRoom = moveToColumn(room, getEntrance('b'), directMove, 'b');
        makePossibleMoves(newRoom);
      } else {
        let move = findAvailableHallwayPositions(room, 'b');
        for (let i = 0; i < move.length; i++) {
          let newRoom = moveToHallway(room, move[i], 'b');
          makePossibleMoves(newRoom);
        }
      }
    }
    if (room.aColumn.some((x) => x != 'a')) {
      let directMove = findAvailableEntrances(room, getEntrance('a'), room.aColumn[room.aColumn.length - 1]);
      if (directMove != null) {
        let newRoom = moveToColumn(room, getEntrance('a'), directMove, 'a');
        makePossibleMoves(newRoom);
      } else {
        let move = findAvailableHallwayPositions(room, 'a');
        for (let i = 0; i < move.length; i++) {
          let newRoom = moveToHallway(room, move[i], 'a');
          makePossibleMoves(newRoom);
        }
      }
    }

    for (let i = 0; i < room.hallway.length; i++) {
      if (room.hallway[i] != '.') {
        let move = findAvailableEntrances(room, i);
        if (move != null) {
          //console.log('move from hallway to room', room.hallway[i], minCost, room);

          let newRoom = moveToColumn(room, i, move);
          makePossibleMoves(newRoom);
        }
      }
    }


    //visitedRooms.push(convertToString(room));
  }
}

function convertToString(room: Room): string {
  return (
    room.hallway.join('') +
    '/' +
    room.aColumn.join('') +
    '/' +
    room.bColumn.join('') +
    '/' +
    room.cColumn.join('') +
    '/' +
    room.dColumn.join('') +
    '/' +
    room.cost
  );
  // return (
  //   room.hallway.join('') +
  //   '/' +
  //   room.aColumn.join('') +
  //   '/' +
  //   room.bColumn.join('') +
  //   '/' +
  //   room.cColumn.join('') +
  //   '/' +
  //   room.dColumn.join('')
  // );
}

function moveToHallway(room: Room, hallwayPos: number, col: 'a' | 'b' | 'c' | 'd'): Room {
  ///console.log('move from room to hallway', col, hallwayPos, minCost, room.cost);

  let newRoom = copyRoom(room);
  if (col == 'a') {
    newRoom.hallway[hallwayPos] = newRoom.aColumn.pop();
    newRoom.cost += getCost(
      hallwayPos,
      newRoom.hallway[hallwayPos] as 'a' | 'b' | 'c' | 'd',
      newRoom.aColumn,
      getEntrance('a')
    );
  } else if (col == 'b') {
    newRoom.hallway[hallwayPos] = newRoom.bColumn.pop();
    newRoom.cost += getCost(
      hallwayPos,
      newRoom.hallway[hallwayPos] as 'a' | 'b' | 'c' | 'd',
      newRoom.bColumn,
      getEntrance('b')
    );
  } else if (col == 'c') {
    newRoom.hallway[hallwayPos] = newRoom.cColumn.pop();
    newRoom.cost += getCost(
      hallwayPos,
      newRoom.hallway[hallwayPos] as 'a' | 'b' | 'c' | 'd',
      newRoom.cColumn,
      getEntrance('c')
    );
  } else if (col == 'd') {
    newRoom.hallway[hallwayPos] = newRoom.dColumn.pop();
    newRoom.cost += getCost(
      hallwayPos,
      newRoom.hallway[hallwayPos] as 'a' | 'b' | 'c' | 'd',
      newRoom.dColumn,
      getEntrance('d')
    );
  }
  return newRoom;
}

function moveToColumn(room: Room, hallwayPos: number, move: Move, sourceCol: string = null): Room {
  let newRoom = copyRoom(room);
  newRoom.hallway[hallwayPos] = '.';
  if (move.destination == 'a') {
    newRoom.aColumn.push(move.destination);
  } else if (move.destination == 'b') {
    newRoom.bColumn.push(move.destination);
  } else if (move.destination == 'c') {
    newRoom.cColumn.push(move.destination);
  } else if (move.destination == 'd') {
    newRoom.dColumn.push(move.destination);
  }
  newRoom.cost += move.costs;
  if (sourceCol != null) {
    let sourceColLength;
    if (sourceCol == 'a') {
      newRoom.aColumn.pop();
      sourceColLength = newRoom.aColumn.length;
    } else if (sourceCol == 'b') {
      newRoom.bColumn.pop();
      sourceColLength = newRoom.bColumn.length;
    } else if (sourceCol == 'c') {
      newRoom.cColumn.pop();
      sourceColLength = newRoom.cColumn.length;
    } else if (sourceCol == 'd') {
      newRoom.dColumn.pop();
      sourceColLength = newRoom.dColumn.length;
    }

    if (move.destination == 'a') {
      newRoom.cost += roomSize - sourceColLength;
    } else if (move.destination == 'b') {
      newRoom.cost += (roomSize - sourceColLength) * 10;
      // console.log('!!!!!!', sourceColLength);
    } else if (move.destination == 'c') {
      newRoom.cost += (roomSize - sourceColLength) * 100;
    } else if (move.destination == 'd') {
      newRoom.cost += (roomSize - sourceColLength) * 1000;
    }
  }
  return newRoom;
}

function copyRoom(room: Room): Room {
  let newRoom = new Room();
  newRoom.hallway = [...room.hallway];
  newRoom.aColumn = [...room.aColumn];
  newRoom.bColumn = [...room.bColumn];
  newRoom.cColumn = [...room.cColumn];
  newRoom.dColumn = [...room.dColumn];
  newRoom.cost = room.cost;
  return newRoom;
}

function findAvailableHallwayPositions(room: Room, col: 'a' | 'b' | 'c' | 'd'): number[] {
  let availableHallwayPositions = [];
  let startingPosition = getEntrance(col);
  for (let i = startingPosition; i < 11; i++) {
    if (room.hallway[i] == '.') {
      if (!entrances.includes(i)) {
        availableHallwayPositions.push(i);
      }
    } else {
      break;
    }
  }
  for (let i = startingPosition; i >= 0; i--) {
    if (room.hallway[i] == '.') {
      if (!entrances.includes(i)) {
        availableHallwayPositions.push(i);
      }
    } else {
      break;
    }
  }
  return availableHallwayPositions;
}

function checkPath(room: Room, start: number, end: number): boolean {
  for (let i = Math.min(start, end) + 1; i < Math.max(start, end); i++) {
    if (room.hallway[i] != '.') return false;
  }
  return true;
}

function findAvailableEntrances(room: Room, hallwayPos: number, entrance: string | null = null): Move | null {
  if (entrance == null) entrance = room.hallway[hallwayPos];
  if (entrance == 'a' || entrance == 'b' || entrance == 'c' || entrance == 'd') {
    if (entrance == 'a' && room.aColumn.every((x) => x == 'a')) {
      if (checkPath(room, getEntrance(entrance), hallwayPos)) {
        return { destination: entrance, costs: getCost(hallwayPos, entrance, room.aColumn) };
      }
    } else if (entrance == 'b' && room.bColumn.every((x) => x == 'b')) {
      if (checkPath(room, getEntrance(entrance), hallwayPos)) {
        return { destination: entrance, costs: getCost(hallwayPos, entrance, room.bColumn) };
      }
    } else if (entrance == 'c' && room.cColumn.every((x) => x == 'c')) {
      if (checkPath(room, getEntrance(entrance), hallwayPos)) {
        return { destination: entrance, costs: getCost(hallwayPos, entrance, room.cColumn) };
      }
    } else if (entrance == 'd' && room.dColumn.every((x) => x == 'd')) {
      if (checkPath(room, getEntrance(entrance), hallwayPos)) {
        return { destination: entrance, costs: getCost(hallwayPos, entrance, room.dColumn) };
      }
    }
  }
  return null;
}

function getCost(
  hallwayPos: number,
  entrance: 'a' | 'b' | 'c' | 'd',
  column: string[],
  fromEntrance: number = getEntrance(entrance)
): number {
  let cost = Math.abs(hallwayPos - fromEntrance) + (roomSize - column.length);
  if (entrance == 'b') cost *= 10;
  if (entrance == 'c') cost *= 100;
  if (entrance == 'd') cost *= 1000;
  // console.log(hallwayPos, entrance, column, fromEntrance, cost);
  return cost;
}

function getEntrance(letter: 'a' | 'b' | 'c' | 'd'): number {
  if (letter == 'a') return 2;
  if (letter == 'b') return 4;
  if (letter == 'c') return 6;
  if (letter == 'd') return 8;
}
