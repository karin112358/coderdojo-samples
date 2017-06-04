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
var applePosX = 0;
var applePosY = 0;
var dirX = 1;
var dirY = 0;
var speed = 3;
var points = 0;
var snake = [];

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
    var posX = Math.floor(width / 2);
    var posY = Math.floor(height / 2);
    for (var i = 0; i < 5; i++) {
        snake.push({ x: posX + i, y: posY });
    }

    // draw first apple
    drawApple();

    // start game loop
    gameLoop();
} catch (ex) {
    console.log(ex.toString());
    quitGame();
}

function gameLoop() {
    // set new position
    var posX = snake[snake.length - 1].x + dirX;
    var posY = snake[snake.length - 1].y + dirY;
    snake.push({ x: posX, y: posY });

    // check new position
    if (posX == 1 || posX == width || posY == 1 || posY == height) {
        cursor.red();
        cursor.bg.white();
        gameOver();
    }

    // check snake
    for (var i = 0; i < snake.length - 1; i++) {
        if (snake[snake.length - 1].x == snake[i].x && snake[snake.length - 1].y == snake[i].y) {
            gameOver();
        }
    }

    // check if apple is touched
    var appleTouched = posX == applePosX && posY == applePosY;
    if (appleTouched) {
        // increase points
        points++;

        // increase speed
        if (speed < 20) {
            speed += 0.5;
        }

        // draw new apple
        drawApple();
    }

    // draw snake at new position
    drawSnake(appleTouched);

    // call gameLoop
    setTimeout(gameLoop, 1000 / speed);
}

function gameOver() {
    setText(width / 2 - 6, height / 2, '  GAME OVER  ');
    quitGame();
}

function quitGame() {
    // reset colors
    cursor.reset();
    cursor.bg.reset();

    // show cursor
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

function drawApple() {
    applePosX = Math.ceil(Math.random() * (width - 2)) + 1;
    applePosY = Math.ceil(Math.random() * (height - 2)) + 1;

    cursor.bg.red();
    drawPoint(applePosX, applePosY);
    cursor.bg.reset();

    setText(1, height + 2, 'Points: ' + points.toString());
    setText(1, height + 3, 'Speed: ' + speed.toString() + '     ');
}

function drawSnake(grow) {
    // remove last position
    if (!grow) {
        cursor.bg.black();
        drawPoint(snake[0].x, snake[0].y);
        snake.splice(0, 1);
    }

    // draw new position
    cursor.bg.green();
    drawPoint(snake[snake.length - 1].x, snake[snake.length - 1].y);
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