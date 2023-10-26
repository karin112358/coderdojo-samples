import { GameOptions } from './game-options';
import { BackgroundSprite } from './sprites/background-sprite';
import { CandySprite } from './sprites/candy-sprite';
import { GhostSprite } from './sprites/ghost-sprite';
import { MonsterSprite } from './sprites/monster-sprite';
import { PlatformsSprite } from './sprites/platforms-sprite';
import { PointsSprite } from './sprites/points-sprite';

export class MainScene extends Phaser.Scene {
  private monster: MonsterSprite;
  private background: BackgroundSprite;
  private points: PointsSprite;
  private platforms: PlatformsSprite;
  private ghosts: GhostSprite[] = [];
  private ghostSpeed = 50;

  constructor() {
    super({ key: 'MainScene' });
  }

  create(): void {
    // physics
    this.physics.world.setBounds(
      0,
      0,
      GameOptions.gameSize.width * 10,
      GameOptions.gameSize.height - 57
    );

    // add sprites
    this.background = new BackgroundSprite(this);
    this.platforms = new PlatformsSprite(this);
    this.points = new PointsSprite(this);
    this.monster = new MonsterSprite(this);

    // camera
    this.cameras.main.setBounds(0, 0, GameOptions.gameSize.width * 5, 600);
    this.cameras.main.startFollow(this.monster.sprite, true, 0.1, 0.1);

    // plattforms collider
    this.physics.add.collider(this.platforms.group, this.monster.sprite);

    // add ghosts
    this.addGhost();
    setInterval(() => this.addGhost(), 3_000);
  }

  update(): void {
    for (let ghost of this.ghosts) {
      if (this.monster.sprite.x > ghost.sprite.x + 100) {
        ghost.direction = 'right';
      } else if (this.monster.sprite.x < ghost.sprite.x - 100) {
        ghost.direction = 'left';
      }

      if (this.monster.sprite.y > ghost.sprite.y + 100) {
        ghost.verticalDirection = 'down';
      } else if (this.monster.sprite.y < ghost.sprite.y - 100) {
        ghost.verticalDirection = 'up';
      }

      ghost.update();
    }

    this.monster.update();
    this.points.update();
    this.background.update();
    this.platforms.update();
  }

  private addGhost() {
    if (this.ghosts.length < 5) {
      const ghost = new GhostSprite(
        this,
        this.monster.sprite.x + 300,
        this.ghostSpeed
      );
      this.ghostSpeed += 5;
      this.ghosts.push(ghost);

      // ghost collider
      this.physics.add.overlap(
        ghost.sprite,
        this.monster.sprite,
        (ghost, monster) => {
          console.log(ghost.body.touching, monster.body.touching);
          if (this.monster.alive && ghost.body.touching.up) {
            // remove ghost
            let index = this.ghosts.findIndex((g) => g.sprite === ghost);
            this.ghosts.splice(index, 1);
            ghost.destroy();

            this.addCandy();
          } else {
            this.monster.die();
          }
        }
      );

      // platforms collider
      this.physics.add.collider(this.platforms.group, ghost.sprite);
    }
  }

  private addCandy() {
    const candy = new CandySprite(
      this,
      this.monster.sprite.x,
      this.monster.sprite.y - 100
    );

    // ghost collider
    this.physics.add.overlap(
      candy.sprite,
      this.monster.sprite,
      (candy, monster) => {
        if (this.monster.alive) {
          this.points.add();
          candy.destroy();
        }
      }
    );

    // platforms collider
    this.physics.add.collider(this.platforms.group, candy.sprite);
  }
}
