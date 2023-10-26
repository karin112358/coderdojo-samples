import { Scene } from 'phaser';
import { GameOptions } from '../game-options';
import { SpriteBase } from './sprite-base';

export class PlatformsSprite {
  group: Phaser.GameObjects.Group;

  private size = 113;
  private scale = 40 / 113;
  private config = [
    { pos: 7, width: 4, y: 400 },
    { pos: 14, width: 5, y: 400 },
    { pos: 20, width: 7, y: 240 },
    { pos: 30, width: 5, y: 400 },
    { pos: 43, width: 5, y: 400 },
    { pos: 50, width: 7, y: 240 },
    { pos: 60, width: 5, y: 400 },
    { pos: 70, width: 2, y: 240 },
    { pos: 74, width: 2, y: 240 },
    { pos: 78, width: 2, y: 240 },
    { pos: 82, width: 2, y: 240 },
    { pos: 86, width: 2, y: 240 },
  ];

  constructor(protected scene: Scene) {
    this.group = scene.add.group();

    for (let item of this.config) {
      for (let i = 0; i < item.width; i++) {
        const platform = this.group.create(
          (item.pos + i) * this.size * this.scale,
          item.y,
          'platform1'
        );

        platform.setScale(this.scale);

        scene.physics.add.existing(platform);
        platform.body.velocity.y = 0;
        platform.body.setAllowGravity(false);
        platform.body.setImmovable(true);
      }
    }
  }

  update(): void {}
}
