/// <reference path="node_modules/phaser/types/phaser.d.ts" />
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
const game = new Phaser.Game(config);
let platforms;
function preload() {
    this.load.image('background', 'assets/xmas_game_gui_background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.spritesheet('yeti', 'assets/yeti-walk.png', {
        frameWidth: 230,
        frameHeight: 286
    });
}
function create() {
    this.add.image(800, 600, 'background');
    platforms = this.physics.add.staticGroup();
    platforms.create(300, 500, 'ground').scale(0.5);
    platforms.create(500, 400, 'ground');
    const yeti = this.physics.add.sprite(200, 300, 'yeti');
}
function update() { }
//# sourceMappingURL=index.js.map