(function activateSnake() {
    manageWindow();    
    //initSnake(0, 10, 5, 1);
})();

// function initSnake(x, y, length, direction) {
//     var Snake = function (x, y, length, direction) {
//         this.initValues = {
//             x: x,
//             y: y,
//             direction: direction,
//             length: length
//         };

//         this.walls = {
//             x: {
//                 start: 0,
//                 end: $(window).width()
//             },
//             y: {
//                 start: 0,
//                 end: $(window).height() - 70
//             }
//         };

//         this.init();
//     };

//     Snake.prototype.init = function () {
//         this.head = {
//             x: this.initValues.x,
//             y: this.initValues.y
//         };

//         this.direction = this.initValues.direction;
//         this.gameOver = false;

//         $('.previous').text(this.score);
//         this.score = 0;
//         $('.score').text(this.score);

//         this.body = [];
//         for (var i = 0; i < this.initValues.length; i += 1) {
//             this.body.push('#' + this.head.x + '-' + this.head.y);
//         }
//         $(this.body[0]).attr('fill', 'red');

//         $('.start-btn').text('Start');
//         $('.start-btn').one('click', function () {
//             this.paused = false;
//             this.listenUserControls();
//             this.poopCandy();
//             this.move();
//             $('.start-btn').text('Pause');
//             $('.start-btn').one('click', function () { this.pause(); }.bind(this));
//         }.bind(this));
//     };

//     Snake.prototype.pause = function () {
//         $('.start-btn').text('Continue');
//         this.paused = true;
//         $('.start-btn').one('click', function () { this.continue(); }.bind(this));
//     };

//     Snake.prototype.continue = function () {
//         $('.start-btn').text('Pause');
//         this.paused = false;
//         this.move();
//         $('.start-btn').one('click', function () { this.pause(); }.bind(this));
//     };

//     Snake.prototype.deleteTail = function () {
//         if (this.hasAteCandy) {
//             this.hasAteCandy = false;
//             return;
//         }
//         $(this.body[this.body.length - 1])
//             .attr('fill', 'transparent')
//             .attr('r', 4);
//         this.body.pop();
//     };

//     Snake.prototype.deleteBody = function () {
//         this.body.forEach(function (item) {
//             $(item)
//                 .attr('fill', 'transparent')
//                 .attr('r', 4);
//         });
//     };

//     Snake.prototype.right = function () {
//         this.head.x += 10;
//         this.body.unshift('#' + this.head.x + '-' + this.head.y);

//         $(this.body[0])
//             .attr('fill', 'red')
//             .attr('r', 5);
//         this.checkCandy();

//         if (this.head.x < this.walls.x.start || this.head.x > this.walls.x.end) {
//             this.gameOver = true;
//         } else {
//             this.deleteTail();
//         }
//     };

//     Snake.prototype.left = function () {
//         this.head.x -= 10;
//         this.body.unshift('#' + this.head.x + '-' + this.head.y);

//         $(this.body[0])
//             .attr('fill', 'red')
//             .attr('r', 5);
//         this.checkCandy();

//         if (this.head.x < this.walls.x.start || this.head.x > this.walls.x.end) {
//             this.gameOver = true;
//         } else {
//             this.deleteTail();
//         }
//     };

//     Snake.prototype.up = function () {
//         this.head.y -= 10;
//         this.body.unshift('#' + this.head.x + '-' + this.head.y);

//         $(this.body[0])
//             .attr('fill', 'red')
//             .attr('r', 5);
//         this.checkCandy();

//         if (this.head.y < this.walls.y.start || this.head.y > this.walls.y.end) {
//             this.gameOver = true;
//         } else {
//             this.deleteTail();
//         }
//     };

//     Snake.prototype.down = function () {
//         this.head.y += 10;
//         this.body.unshift('#' + this.head.x + '-' + this.head.y);

//         $(this.body[0])
//             .attr('fill', 'red')
//             .attr('r', 5);
//         this.checkCandy();

//         if (this.head.y < this.walls.y.start || this.head.y > this.walls.y.end) {
//             this.gameOver = true;
//         } else {
//             this.deleteTail();
//         }
//     };

//     Snake.prototype.move = function () {
//         if (this.gameOver) {
//             this.restart();
//             return;
//         } else if (this.paused) {
//             return;
//         }
//         switch (this.direction) {
//             case 0:
//                 this.up();
//                 break;
//             case 1:
//                 this.right();
//                 break;
//             case 2:
//                 this.down();
//                 break;
//             case 3:
//                 this.left();
//                 break;
//         }
//         setTimeout(function () { this.move(); }.bind(this), 100);
//     };

//     Snake.prototype.restart = function (x, y, d) {
//         this.deleteBody();
//         this.deleteCandy();
//         this.init();
//     };

//     Snake.prototype.listenUserControls = function () {
//         document.onkeydown = checkKey.bind(this);
//         function checkKey(e) {
//             e = e || window.event;
//             if (e.keyCode == '38') {
//                 this.direction = 0;
//             }
//             else if (e.keyCode == '39') {
//                 this.direction = 1;
//             }
//             else if (e.keyCode == '40') {
//                 this.direction = 2;
//             }
//             else if (e.keyCode == '37') {
//                 this.direction = 3;
//             }
//         }
//     };

//     Snake.prototype.poopCandy = function () {
//         this.candyPos = getRandomPos(this.walls);
//         $('#' + this.candyPos.x + '-' + this.candyPos.y)
//             .attr('fill', 'blue')
//             .attr('r', 6);
//     };

//     Snake.prototype.checkCandy = function () {
//         if (this.head.x === this.candyPos.x && this.head.y === this.candyPos.y) {
//             this.hasAteCandy = true;
//             this.score += 1;
//             $('.score').text(this.score);
//             this.poopCandy();
//         }
//     };

//     Snake.prototype.deleteCandy = function () {
//         $('#' + this.candyPos.x + '-' + this.candyPos.y)
//             .attr('fill', 'transparent')
//             .attr('r', 4);
//     };

//     var snake = new Snake(x, y, length, direction);
// }

// function getRandomPos(walls) {
//     var x = Math.floor(Math.random() * walls.x.end);
//     var y = Math.floor(Math.random() * walls.y.end)
//     return {
//         x: x - x % 10,
//         y: y - y % 10
//     };
// }

function manageWindow() {
    var height = 40;
    var width = 60;
    var elementSize = 10;
    drawSVG(height, width);
    drawGrid(height, width);

    function drawSVG(height, width) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('height', height * elementSize);
        svg.setAttribute('width', width * elementSize);
        svg.setAttribute('viewBox', '0 0 ' + width * elementSize + ' ' + height * elementSize);
        $('.game').append(svg);
    };

    function drawGrid(height, width) {
        for (var i = 0; i < height; i += 1) {
            drawLine(width, i);
        }
    }

    function drawLine(width, y) {
        for (var i = 0; i < width; i += 1) {
            drawCircle(i, y);
        }
    }

    function drawCircle(x, y) {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        $(circle).attr('fill', 'transparent');
        $(circle).attr('cx', x * elementSize + Math.round(elementSize / 2));
        $(circle).attr('cy', y * elementSize + Math.round(elementSize / 2));
        $(circle).attr('r', 4);
        $(circle).attr('id', x + '-' + y);
        $('svg').append(circle);
    }
}
