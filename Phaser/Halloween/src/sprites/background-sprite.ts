import { Scene } from 'phaser';
import { GameOptions } from '../game-options';
import { SpriteBase } from './sprite-base';

export class BackgroundSprite extends SpriteBase<Phaser.GameObjects.TileSprite> {
  constructor(protected scene: Scene) {
    super(scene);

    this.sprite = this.scene.add
      .tileSprite(
        0,
        0,
        GameOptions.gameSize.width * 10,
        GameOptions.gameSize.height,
        'background1'
      )
      .setOrigin(0, 0);

    this.sprite.setTileScale(0.56);
  }

  update(): void {}
}
