export class Grid extends Phaser.GameObjects.Container {
  private gridObjects: GridSquare[][];
  constructor({ scene, x, y }: { scene: Phaser.Scene; x: number; y: number }) {
    super(scene, x, y);

    this.scene.add.existing(this);
  }

  build() {
    this.gridObjects = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let ii = 0; ii < 3; ii++) {
        const gridSquare = new GridSquare({
          scene: this.scene,
          x: i * 68,
          y: ii * 68,
        });
        row.push(gridSquare);
        this.add(gridSquare);
      }
    }
  }
}

export class GridSquare extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }: { scene: Phaser.Scene; x: number; y: number }) {
    super(scene, x, y, "tile", 0);
    scene.add.existing(this);
  }

  static spriteDependencies: SpriteDependency[] = [
    {
      frameWidth: 64,
      frameHeight: 64,
      key: "tile",
      url: "src/assets/sprites/tile.png",
    },
  ];
  static audioDependencies: AudioDependency[] = [];
}
