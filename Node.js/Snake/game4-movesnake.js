/*jslint node: true, for: true */
'use strict';
var ansi = require('ansi');
var keypress = require('keypress');

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

var cursor = ansi(process.stdout);
var width = 40;
var height = 20;
var posX = 0;
var posY = 0;
var dirX = 1;
var dirY = 0;

try {
    // clear output
    process.stdout.write('\x1Bc');
    // hide cursor
    process.stderr.write('\x1B[?25l');

    // draw game area
    cursor.bg.grey();
    drawHorizontalLine(1, 1, width);
    drawHorizontalLine(1, height, width);
    drawVerticalLine(1, 1, height);
    drawVerticalLine(width, 1, height);
    cursor.bg.reset();

    // handle key press events
    process.stdin.on('keypress', handleInput);

    // set initial position of snake
    posX = Math.floor(width / 2);
    posY = Math.floor(height / 2);

    // start game loop
    gameLoop();
} catch (ex) {
    console.log(ex.toString());
    quitGame();
}

function gameLoop() {
    // remove snake at old position
    removeSnake(posX, posY);

    // set new position
    posX = posX + dirX;
    posY = posY + dirY;

    // check new position
    if (posX == 1 || posX == width || posY == 1 || posY == height) {
        cursor.red();
        cursor.bg.white();
        setText(width / 2 - 6, height / 2, "  GAME OVER  ");
        quitGame();
    }

    // draw snake at new position
    drawSnake();

    // call gameLoop
    setTimeout(gameLoop, 500);
}

function quitGame() {
    cursor.reset();
    cursor.bg.reset();
    process.stderr.write('\x1B[?25h');
    cursor.goto(1, height + 4);
    process.exit();
}

function handleInput(chunk, key) {
    if (key.name == 'q') {
        quitGame();
    } else if (key.name == 'right') {
        dirX = 1;
        dirY = 0;
    } else if (key.name == 'left') {
        dirX = -1;
        dirY = 0;
    } else if (key.name == 'up') {
        dirX = 0;
        dirY = -1;
    } else if (key.name == 'down') {
        dirX = 0;
        dirY = 1;
    }
}

function removeSnake() {
    cursor.bg.black();
    drawPoint(posX, posY);
    cursor.bg.reset();
}

function drawSnake() {
    cursor.bg.green();
    drawPoint(posX, posY);
    cursor.bg.reset();
}

function drawPoint(col, row, char) {
    cursor.goto(col, row).write(' ');
}

function drawHorizontalLine(col, row, length) {
    for (var i = 0; i < length; i++) {
        cursor.goto(col + i, row).write(' ');
    }
}

function drawVerticalLine(col, row, length) {
    for (var i = 0; i < length; i++) {
        cursor.goto(col, row + i).write(' ');
    }
}

function setText(col, row, text) {
    cursor.goto(col, row).write(text);
}