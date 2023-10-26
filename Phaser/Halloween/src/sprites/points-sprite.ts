import { Scene } from 'phaser';
import { GameOptions } from '../game-options';
import { SpriteBase } from './sprite-base';

export class PointsSprite extends SpriteBase<Phaser.GameObjects.Image> {
  private textObject: Phaser.GameObjects.Text;
  private points = 0;

  constructor(protected scene: Scene) {
    super(scene);

    this.sprite = this.scene.add
      .image(GameOptions.gameSize.width - 100, 10, 'candy1')
      .setOrigin(0, 0);
    this.sprite.scale = 0.18;
    this.sprite.scrollFactorX = 0;

    var style = {
      fontSize: '36px',
      fontFamily: `'Fruktur', cursive`,
      fill: '#7ad404',
      align: 'center',
      boundsAlignV: 'middle',
    };

    this.textObject = scene.add
      .text(
        GameOptions.gameSize.width - 65,
        55,
        this.points.toString(),
        style
      )
      .setOrigin(0.5);

      this.textObject.scrollFactorX = 0;
  }

  add() {
    this.points++;
  }

  remove() {
    this.points--;
  }

  update(): void {
    this.textObject.text = this.points.toString();
  }
}
