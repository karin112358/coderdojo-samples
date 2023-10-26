import { Game } from './game';

const gameArea = <HTMLDivElement>document.getElementById('game-area');
const game = new Game(gameArea);