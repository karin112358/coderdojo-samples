export class PreloadAssets extends Phaser.Scene {
  // constructor
  constructor() {
    super({
      key: 'PreloadAssets',
    });
  }

  // preload assets
  preload(): void {
    // webfont loader script
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


    // background
    for (let i = 1; i <= 4; i++) {
      this.load.image(
        `background${i}`,
        `assets/images/${i}_game_background.png`
      );
    }

    // star
    this.load.image(`star`, `assets/images/star_1.png`);

    // candy
    for (let i = 1; i <= 50; i++) {
      this.load.image(`candy${i}`, `assets/images/candy/${i}.png`);
    }

    // platform
    for (let i = 1; i <= 4; i++) {
      this.load.image(`platform${i}`, `assets/images/${i}_platform.png`);
    }

    // monster frames
    for (let i = 0; i <= 23; i++) {
      this.load.image(
        `walk${i}`,
        `assets/images/sprites/golem_1/0_Golem_Walking_${this.formatNumber(
          i,
          3
        )}.png`
      );
    }

    for (let i = 0; i <= 17; i++) {
      this.load.image(
        `idle${i}`,
        `assets/images/sprites/golem_1/0_Golem_Idle_${this.formatNumber(
          i,
          3
        )}.png`
      );
    }

    for (let i = 0; i <= 14; i++) {
      this.load.image(
        `dying${i}`,
        `assets/images/sprites/golem_1/0_Golem_Dying_${this.formatNumber(
          i,
          3
        )}.png`
      );
    }

    // ghost frames
    for (let i = 0; i <= 11; i++) {
      this.load.image(
        `ghost_idle${i}`,
        `assets/images/sprites/wraith_3/Wraith_03_Idle_${this.formatNumber(
          i,
          3
        )}.png`
      );
    }
  }

  // method to be called once the instance has been created
  create(): void {
    // call PlayGame class
    this.scene.start('MainScene');
  }

  private formatNumber(i: number, targetLength: number): string {
    let result = i.toString();
    while (result.length < targetLength) {
      result = '0' + result;
    }

    return result;
  }
}
