import DependentScene from "../DependentScene";

class CatshapeDaruma extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "catshape-daruma", 0);
  }
  static spriteDependencies: SpriteDependency[] = [
    {
      frameHeight: 280,
      frameWidth: 280,
      key: "catshape-daruma",
      url: "/src/assets/images/catshape-daruma.png",
    },
  ];
}

export class MainScene extends DependentScene {
  static spriteDependencies: SpriteDependency[] = [
    ...CatshapeDaruma.spriteDependencies,
  ];
  constructor() {
    super({
      key: "MainScene",
    });
  }

  preload(): void {}

  create(): void {
    this.add.existing(
      new CatshapeDaruma(
        this,
        this.game.canvas.width / 2,
        this.game.canvas.height / 2
      )
    );
  }

  update(time: number, delta: number): void {}
}
