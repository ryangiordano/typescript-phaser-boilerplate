/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import Enemy from "../components/enemy/Enemy";
import { Grid, GridSquare } from "../components/grid/Grid";
import GridController from "../components/GridController";
import Player from "../components/player/Player";
import { Directions } from "../Constants";
import DependentScene from "./DependentScene";

export class MainScene extends DependentScene {
  constructor() {
    super({
      key: "MainScene",
    });
  }

  static spriteDependencies: SpriteDependency[] = [
    ...GridSquare.spriteDependencies,
    ...Player.spriteDependencies,
  ];
  static audioDependencies: AudioDependency[] = [];

  preload(): void {}

  create(): void {
    this.populatePlayer();
    this.populateEnemies();
  }

  private populatePlayer() {
    const grid = new Grid({ scene: this, x: 230, y: 240 });
    const player = new Player({ scene: this, x: 0, y: 0, texture: "yaya" });
    const heroGridController = new GridController({
      scene: this,
      grid,
    });

    heroGridController.init();
    heroGridController.addMoveableToGrid(player);
    heroGridController.moveToCenter(player);

    player.setInputs((direction, player) =>
      heroGridController.handleMove(direction, player)
    );
    player.face(Directions.right);
  }

  private populateEnemies() {
    const enemyGrid = new Grid({ scene: this, x: 440, y: 240 });
    const enemy = new Enemy({ scene: this, x: 0, y: 0, texture: "tuzi" });
    const enemyGridController = new GridController({
      scene: this,
      grid: enemyGrid,
    });
    enemyGridController.init();
    enemyGridController.addMoveableToGrid(enemy);
    enemy.face(Directions.left);
  }
}
