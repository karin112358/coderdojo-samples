/*jslint node: true, for: true */
'use strict';
var ansi = require('ansi');

var cursor = ansi(process.stdout);

try {
    // cursor.bg.... setzt die Hintergrundfarbe, so können wir mit dem Leerzeichen farbige Flächen malen
    cursor.bg.red();
    cursor.goto(5, 5).write(' ');
    cursor.goto(6, 5).write(' ');
    cursor.goto(7, 5).write(' ');
    // mit reset setzt du die Hintergrundfarbe wieder zurück
    cursor.bg.reset();

    // cursor..... setzt die Textfarbe
    cursor.yellow();
    cursor.goto(9, 5).write('MY GAME');
    cursor.reset();

    cursor.bg.red();
    cursor.goto(17, 5).write(' ');
    cursor.goto(18, 5).write(' ');
    cursor.goto(19, 5).write(' ');
    cursor.bg.reset();
} catch (ex) {
    // hier werden Fehler erkannt und ausgegeben
    console.log(ex.toString());
} finally {
    // zum Schluss müssen wir das Spiel beenden
    quitGame();
}

function quitGame() {
    cursor.reset();
    cursor.bg.reset();
    cursor.goto(1, 10);
    process.exit();
}