export abstract class SpriteBase<T extends Phaser.GameObjects.GameObject> {
  sprite: T;

  protected cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  protected spaceKey: Phaser.Input.Keyboard.Key;

  protected get body(): Phaser.Physics.Arcade.Body {
    return this.sprite.body as Phaser.Physics.Arcade.Body;
  }

  constructor(protected scene: Phaser.Scene) {
    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.spaceKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }
}
