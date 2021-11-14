/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Grid, GridSquare } from "../components/grid/Grid";
import GridController from "../components/GridController";
import Player from "../components/player/Player";
import DependentScene from "./DependentScene";

export class MainScene extends DependentScene {
  constructor() {
    super({
      key: "MainScene",
    });
  }

  static spriteDependencies: SpriteDependency[] = [
    ...GridSquare.spriteDependencies,
  ];
  static audioDependencies: AudioDependency[] = [];

  preload(): void {}

  create(): void {
    const grid = new Grid({ scene: this, x: 100, y: 100 });
    const player = new Player({ scene: this, x: 0, y: 0 });
    const gridController = new GridController({
      scene: this,
      grid,
      player,
    });
    gridController.init();
  }
}

// Two grids

// player and enemy
// player and enemy can move and shoot each other on their respective grids
