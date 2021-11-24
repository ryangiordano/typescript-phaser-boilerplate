import { Directions } from "../../Constants";
import Moveable from "../Moveable";

export default class Enemy extends Moveable {
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
    scene.physics.add.existing(this);
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
