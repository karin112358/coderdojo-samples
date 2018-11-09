'use strict';

var socket = io();
var currentUser = null;
var previousStatus = null;

(function activate() {
    updateStatus('start');
    document.onkeydown = checkKey.bind(this);

    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            socket.emit('moveUp');
        } else if (e.keyCode == '39') {
            socket.emit('moveRight');
        } else if (e.keyCode == '40') {
            socket.emit('moveDown');
        } else if (e.keyCode == '37') {
            socket.emit('moveLeft');
        }
    }
})();

function joinGame() {
    var username = $('#username').val();
    if (username) {
        currentUser = username;
        socket.emit('joinGame', username);
        updateStatus('wait');
    } else {
        alert('Username not valid');
    }
}

function startGame() {
    socket.emit('startGame');
}

function updateStatus(status) {
    switch (status) {
        case 'start':
            $('.join-game').show();
            $('.waiting-for-user').hide();
            $('.start-game').hide();
            $('.game').hide();
            break;
        case 'wait':
            $('.join-game').hide();
            $('.waiting-for-user').show();
            $('.start-game').hide();
            $('.game').hide();
            break;
        case 'ready':
            $('.join-game').hide();
            $('.waiting-for-user').hide();
            $('.start-game').show();
            $('.game').hide();
            break;
        case 'play':
            $('.join-game').hide();
            $('.waiting-for-user').hide();
            $('.start-game').hide();
            $('.game').show();
            break;
    }
}

socket.on('gameReady', function () {
    updateStatus('ready');
});

socket.on('gameStarted', function () {
    $('.moveCounter').text("0");
    updateStatus('play');
});

socket.on('move', function (status) {
    $('.moveCounter').text(status.moveCounter);

    if (previousStatus) {
        previousStatus.players.forEach(function (player) {
            player.snake.forEach(function (element) {
                $('#' + element.x + '-' + element.y).attr('fill', 'transparent');
            });
        });

        if (previousStatus.candy) {
            $('#' + previousStatus.candy.x + '-' + previousStatus.candy.y).attr('fill', 'transparent');
        }
    }

    status.players.forEach(function (player) {
        player.snake.forEach(function (element) {
            $('#' + element.x + '-' + element.y).attr('fill', player.name == currentUser ? 'green' : 'red');
        });
    });

    if (status.candy) {
        $('#' + status.candy.x + '-' + status.candy.y).attr('fill', 'pink');
    }

    previousStatus = status;
});

socket.on('quitGame', function () {
    if (currentUser) {
        updateStatus('wait');
    } else {
        updateStatus('start');
    }
});

socket.on('gameOver', function (name) {
    if (name == currentUser) {
        alert("You have lost the game.");
    } else {
        alert("WINNER!!!");
    }

    updateStatus('start');
});