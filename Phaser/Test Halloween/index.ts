import { Game } from 'phaser';

let config: Phaser.Types.Core.GameConfig = {
  title: 'Halloween Jump & Run',
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 800,
    height: 600,
  },
};

const game = new Game(config);
