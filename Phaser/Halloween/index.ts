import { Game } from 'phaser';
import { GameOptions } from './src/game-options';
import { MainScene } from './src/main-scene';
import { PreloadAssets } from './src/preload-assets';

let config: Phaser.Types.Core.GameConfig = {
  title: 'Halloween Jump & Run',
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: GameOptions.gameSize.width,
    height: GameOptions.gameSize.height,
  },
  scene: [PreloadAssets, MainScene],
};

const game = new Game(config);
