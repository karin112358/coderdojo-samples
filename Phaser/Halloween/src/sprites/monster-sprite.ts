import { GameOptions } from '../game-options';
import { SpriteBase } from './sprite-base';

export class MonsterSprite extends SpriteBase<Phaser.GameObjects.Sprite> {
  alive = true;

  private speed = 300;

  constructor(protected scene: Phaser.Scene) {
    super(scene);

    this.sprite = this.scene.add.sprite(
      GameOptions.gameSize.width / 2,
      GameOptions.gameSize.height / 2,
      'monster'
    );
    this.initAnimations();
    this.sprite.scale = 0.15;
    this.sprite.play('idle');

    this.scene.physics.add.existing(this.sprite);
    this.body.setSize(300, 530);
    this.body.offset.y = 220;
    this.body.setCollideWorldBounds(true);
    this.body.setBounce(0, 0.2);
  }

  update(): void {
    if (this.alive) {
      if (this.cursorKeys.right.isDown) {
        this.sprite.flipX = false;
        this.sprite.anims.play('walk', true);
        this.sprite.body.velocity.x = this.speed;
      } else if (this.cursorKeys.left.isDown) {
        this.sprite.flipX = true;
        this.sprite.anims.play('walk', true);
        this.sprite.body.velocity.x = this.speed * -1;
      } else {
        this.sprite.anims.play('idle', true);
        this.sprite.body.velocity.x = 0;
      }

      if (this.spaceKey.isDown && this.body.onFloor()) {
        this.sprite.body.velocity.y = -600;
      }
    }
  }

  die(): void {
    if (this.alive) {
      this.alive = false;
      this.sprite.body.velocity.x = 0;
      this.sprite.anims.play({ key: 'dying', repeat: 0 }, true);
    }
  }

  private initAnimations(): void {
    const walkFrames = [];
    const idleFrames = [];
    const dyingFrames = [];

    // ghost frames
    for (let i = 0; i <= 23; i++) {
      walkFrames.push({ key: `walk${i}` });
    }

    for (let i = 0; i <= 17; i++) {
      idleFrames.push({ key: `idle${i}` });
    }

    for (let i = 0; i <= 14; i++) {
      dyingFrames.push({ key: `dying${i}` });
    }

    // keyframes
    this.sprite.anims.create({
      key: 'walk',
      frames: walkFrames,
      frameRate: 30,
      repeat: -1,
    });

    this.sprite.anims.create({
      key: 'idle',
      frames: idleFrames,
      frameRate: 10,
      repeat: -1,
    });

    this.sprite.anims.create({
      key: 'dying',
      frames: dyingFrames,
      frameRate: 20,
      repeat: -1,
    });
  }
}
