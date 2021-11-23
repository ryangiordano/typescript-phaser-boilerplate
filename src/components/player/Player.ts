import { Directions } from "../../Constants";
import Moveable from "../Moveable";

export default class Player extends Moveable {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor({
    scene,
    x,
    y,
    texture,
  }: {
    scene;
    x: number;
    y: number;
    texture: string;
  }) {
    super(scene, x, y, texture, 0);
    scene.add.existing(this);
  }

  /** Add listeners for player movement,
   * let callback handle any side effects of movement */
  public setInputs(
    onMove: (direction: Directions, moveable: Moveable) => void
  ) {
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.cursors.space.addListener("down", () => {});

    this.cursors.down.addListener("down", () => onMove(Directions.down, this));

    this.cursors.up.addListener("down", () => onMove(Directions.up, this));

    this.cursors.left.addListener("down", () => onMove(Directions.left, this));

    this.cursors.right.addListener("down", () =>
      onMove(Directions.right, this)
    );
  }

  static spriteDependencies: SpriteDependency[] = [
    {
      frameWidth: 64,
      frameHeight: 64,
      key: "yaya",
      url: "src/assets/sprites/yaya.png",
    },
    {
      frameWidth: 64,
      frameHeight: 64,
      key: "tuzi",
      url: "src/assets/sprites/tuzi.png",
    },
  ];
}
