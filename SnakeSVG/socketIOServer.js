/* jslint node: true */
'use strict';

module.exports = {
    start: function (server) {
        var io = require('socket.io')(server);
        var players = [];
        var gameRunning = false;
        var moveCounter = 0;
        var candy = null;
        var width = 60;
        var height = 40;
        var speed = 500;

        // Hier sagen wir Socket.io, dass wir informiert werden wollen,
        // wenn sich etwas bei den Verbindungen ("connections") zu 
        // den Browsern tut. 
        io.on('connection', function (socket) {
            var currentPlayer = null;
            // Die variable "socket" repräsentiert die aktuelle Web Sockets
            // Verbindung zu jeweiligen Browser client.

            // Funktion, die darauf reagiert, wenn sich der Benutzer anmeldet
            socket.on('joinGame', function (username) {
                if (players.length < 2) {
                    console.log('joinGame: ' + username);
                    // Benutzername wird in der aktuellen Socket-Verbindung gespeichert
                    socket.username = username;
                    var snake = [];
                    for (var i = 0; i < 4; i++) {
                        snake.push({ x: players.length == 0 ? i : width - 1 - i, y: Math.round(height / 2) });
                    }

                    currentPlayer = { name: username, dir: players.length == 0 ? 'right' : 'left', snake: snake, candies: 0 };
                    players.push(currentPlayer);

                    if (players.length == 2) {
                        console.log('gameReady');
                        io.sockets.emit('gameReady');
                    }
                }
            });

            // Funktion, die darauf reagiert, wenn ein Benutzer eine Nachricht schickt
            socket.on('startGame', function (data) {
                // Sende die Nachricht an alle Clients
                io.sockets.emit('gameStarted');
                moveCounter = 0;
                gameRunning = true;
                spawnCandy();
                move();
            });

            socket.on('moveLeft', function (data) {
                currentPlayer.dir = 'left';
            });

            socket.on('moveRight', function (data) {
                currentPlayer.dir = 'right';
            });

            socket.on('moveUp', function (data) {
                currentPlayer.dir = 'up';
            });

            socket.on('moveDown', function (data) {
                currentPlayer.dir = 'down';
            });

            // Funktion, die darauf reagiert, wenn sich ein Benutzer abmeldet.
            // Benutzer müssen sich nicht explizit abmelden. "disconnect"
            // tritt auch auf wenn der Benutzer den Client einfach schließt.
            socket.on('disconnect', function () {
                if (currentPlayer) {
                    // Alle über den Abgang des Benutzers informieren
                    gameRunning = false;
                    console.log('quitGame: ' + currentPlayer.name);

                    io.sockets.emit('quitGame');

                    if (currentPlayer) {
                        var index = players.indexOf(currentPlayer);
                        players.splice(index, 1);
                    }

                    console.log('remaining players:');
                    console.log(players);
                }
            });

            function move() {
                moveCounter++;

                players.forEach(function (player) {
                    var head = player.snake[player.snake.length - 1];
                    switch (player.dir) {
                        case 'left':
                            if (head.x == 0) {
                                gameOver(player);
                            } else {
                                player.snake.push({ x: head.x - 1, y: head.y });
                            }
                            break;
                        case 'right':
                            if (head.x == width) {
                                gameOver(player);
                            } else {
                                player.snake.push({ x: head.x + 1, y: head.y });
                            }
                            break;
                        case 'up':
                            if (head.y == 0) {
                                gameOver(player);
                            } else {
                                player.snake.push({ x: head.x, y: head.y - 1 });
                            }
                            break;
                        case 'down':
                            if (head.y == height) {
                                gameOver(player);
                            } else {
                                player.snake.push({ x: head.x, y: head.y + 1 });
                            }
                            break;
                    }

                    head = player.snake[player.snake.length - 1];
                    if (candy && head.x == candy.x && head.y == candy.y) {
                        speed = speed * 0.9;
                        candy = null;
                        player.candies++;
                        spawnCandy();
                    } else {
                        player.snake.splice(0, 1);
                    }
                });

                if (gameRunning) {
                    var status = {
                        moveCounter: moveCounter,
                        players: players,
                        candy: candy
                    };

                    io.sockets.emit('move', status);

                    setTimeout(function () {
                        move();
                    }, speed);
                }
            }

            function spawnCandy() {
                var x = Math.floor(Math.random() * width);
                var y = Math.floor(Math.random() * height);

                var isValid = true;
                players.forEach(function (player) {
                    player.snake.forEach(function (element) {
                        if (element.x == x && element.y == y) {
                            isValid = false;
                        }
                    });
                });

                if (isValid) {
                    candy = { x: x, y: y };
                } else {
                    spawnCandy();
                }
            }

            function gameOver(player) {
                gameRunning = false;
                io.sockets.emit('gameOver', player.name);
            }
        });
    }
};
