export default class Block extends Phaser.Physics.Arcade.Sprite {
  constructor({ scene, x, y }: { scene: Phaser.Scene; x: number; y: number }) {
    super(scene, x, y, "block");
  }



  static spriteDependencies: SpriteDependency[] = [
    {
      frameWidth: 64,
      frameHeight: 64,
      key: "block",
      url: "src/assets/sprites/block.png",
    },
  ];
}
