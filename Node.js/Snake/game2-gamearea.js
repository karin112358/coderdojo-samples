/*jslint node: true, for: true */
'use strict';
var ansi = require('ansi');

var cursor = ansi(process.stdout);
var width = 40;
var height = 20;

try {
    // draw game area
    cursor.bg.grey();
    drawHorizontalLine(1, 1, width);
    drawHorizontalLine(1, height, width);
    drawVerticalLine(1, 1, height);
    drawVerticalLine(width, 1, height);
    cursor.bg.reset();
} catch (ex) {
    console.log(ex.toString());
} finally {
    quitGame();
}

function quitGame() {
    cursor.reset();
    cursor.bg.reset();
    cursor.goto(1, height + 4);
    process.exit();
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