import { GameOptions } from '../game-options';
import { SpriteBase } from './sprite-base';

export class GhostSprite extends SpriteBase<Phaser.GameObjects.Sprite> {
  direction: 'left' | 'right' | 'none' = 'none';
  verticalDirection: 'up' | 'down' | 'none' = 'none';

  constructor(
    protected scene: Phaser.Scene,
    startPosition: number,
    private speed: number
  ) {
    super(scene);

    this.sprite = this.scene.add.sprite(GameOptions.gameSize.width, 0, 'ghost');
    this.initAnimations();
    this.sprite.scale = 0.2;
    this.sprite.play('idle');

    this.scene.physics.add.existing(this.sprite);
    this.body.setSize(180, 300);
    //this.body.allowGravity = true;
    this.body.setCollideWorldBounds(true);
    this.body.setBounce(0, 0);
  }

  update(): void {
    if (this.direction === 'right') {
      this.sprite.flipX = false;
      this.sprite.body.velocity.x = this.speed;
    } else if (this.direction === 'left') {
      this.sprite.flipX = true;
      this.sprite.body.velocity.x = this.speed * -1;
    } else {
      this.sprite.body.velocity.x = 0;
    }

    // if (this.verticalDirection === 'up') {
    //   this.sprite.body.velocity.y = -30;
    // } else if (this.verticalDirection === 'down') {
    //   this.sprite.body.velocity.y = 30;
    // } else {
    //   this.sprite.body.velocity.y = 0;
    // }
  }

  private initAnimations() {
    const walkFrames = [];
    const idleFrames = [];

    // ghost frames
    for (let i = 0; i <= 11; i++) {
      idleFrames.push({ key: `ghost_idle${i}` });
    }

    // keyframes
    this.sprite.anims.create({
      key: 'idle',
      frames: idleFrames,
      frameRate: 10,
      repeat: -1,
    });
  }
}
