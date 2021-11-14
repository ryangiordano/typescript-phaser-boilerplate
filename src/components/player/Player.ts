export default class Player extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }: { scene; x: number; y: number }) {
    super(scene, x, y, null, 0);
  }
}
