import { Grid, GridSquare } from "./grid/Grid";
import Player from "./player/Player";
import { Directions } from "../Constants";
import Enemy from "./enemy/Enemy";
import Moveable from "./Moveable";

export default class GridController {
  private scene: Phaser.Scene;
  private grid: Grid;
  constructor({ scene, grid }: { scene: Phaser.Scene; grid: Grid }) {
    this.scene = scene;
    this.grid = grid;
  }
  init() {
    this.grid.build();
  }

  public moveToCenter(moveable: Moveable) {
    this.moveToCoord({ x: 1, y: 1 }, moveable);
  }

  public moveToCoord({ x, y }: Coords, moveable: Moveable) {
    this.grid.setOccupantAt({ x, y }, moveable);
  }

  public addMoveableToGrid(moveable: Moveable) {
    this.grid.add(moveable);
    const emptyCoord = this.findEmptyCoord();
    if (emptyCoord) {
      this.moveToCoord(emptyCoord, moveable);
    } else {
      throw new Error("No room on the grid for entity");
    }
  }

  private findEmptyCoord() {
    return this.grid.findEmptyCoord();
  }

  /** Use this function to register movements on the GridController from the moveable */
  public handleMove(direction: Directions, moveable: Moveable) {
    const { x, y } = this.grid.getSquareCoordsOfOccupant(moveable);
    if (x === -1 || y === -1) {
      return;
    }
    switch (direction) {
      case Directions.down:
        this.moveToCoord({ x, y: y + 1 }, moveable);
        break;
      case Directions.up:
        this.moveToCoord({ x, y: y - 1 }, moveable);

        break;
      case Directions.left:
        this.moveToCoord({ x: x - 1, y }, moveable);

        break;
      case Directions.right:
        this.moveToCoord({ x: x + 1, y }, moveable);
        break;
    }
  }
}
