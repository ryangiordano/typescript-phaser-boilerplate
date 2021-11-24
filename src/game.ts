/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import "phaser";
import { MainScene } from "./scenes/MainScene";
import PhaserUpdatePlugin from "./utility/UpdatePlugin";
import { Plugin as NineSlicePlugin } from "phaser3-nineslice";

import { BLACK } from "./utility/Constants";
import { AudioScene } from "./scenes/AudioScene";
import { BootScene } from "./scenes/BootScene";
export type GameScenes = "BootScene" | "MainScene" | "Audio";
// main game configuration
const config: Phaser.Types.Core.GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, MainScene, AudioScene],
  plugins: {
    global: [NineSlicePlugin.DefaultCfg],
    scene: [
      { key: "updatePlugin", plugin: PhaserUpdatePlugin, mapping: "updates" },
    ],
  },
  backgroundColor: BLACK.str,
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
    },
  },
  render: { pixelArt: true, antialias: false },
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  const game = new Game(config);
});
