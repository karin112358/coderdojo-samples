import { Scene } from 'phaser';
import { GameOptions } from '../game-options';
import { SpriteBase } from './sprite-base';

export class CandySprite extends SpriteBase<Phaser.GameObjects.Image> {
  constructor(protected scene: Scene, x: number, y: number) {
    super(scene);

    this.sprite = this.scene.add
      .image(x, y, 'candy' + Math.floor(Math.random() * 44 + 1).toString())
      .setOrigin(0, 0);
    this.sprite.scale = 0.1;

    this.scene.physics.add.existing(this.sprite);
    this.body.setCollideWorldBounds(true);

    this.sprite.body.velocity.y = -300;
    this.sprite.body.velocity.x = (Math.random() - 0.5) * 100;
  }

  update(): void {}
}
