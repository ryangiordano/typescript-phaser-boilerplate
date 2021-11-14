import { Grid } from "./grid/Grid";
import Player from "./player/Player";

export default class GridController {
  private scene: Phaser.Scene;
  private grid: Grid;
  private player: Player;
  constructor({
    scene,
    grid,
    player,
  }: {
    scene: Phaser.Scene;
    grid: Grid;
    player: Player;
  }) {
    this.scene = scene;
    this.grid = grid;
    this.player = player;
  }
  init() {
    this.grid.build();
  }
}
