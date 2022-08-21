import { AnimationHelper } from "../../utility/tweens/animation-helper";
import { BLACK, WHITE } from "../../utility/Constants";
import DependentScene from "../DependentScene";
import { UIScene } from "../UIScene/UIScene";
import { StateScene } from "../StateScene/StateScene";
import { MainScene } from "../MainScene/MainScene";

function preloadSceneDependencies(
  bootScene: Phaser.Scene,
  scenes: typeof DependentScene[]
) {
  scenes.forEach((scene) => {
    const { spriteDependencies, audioDependencies } = scene;
    if (spriteDependencies?.length) {
      spriteDependencies.forEach((sd) => {
        bootScene.load.spritesheet(sd.key, sd.url, {
          frameWidth: sd.frameWidth,
          frameHeight: sd.frameHeight,
        });
      });
    }
    if (audioDependencies?.length) {
      audioDependencies.forEach((ad) => {
        bootScene.load.audio(ad.key, ad.url);
      });
    }
  });
}

export class BootScene extends Phaser.Scene {
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;
  private loaded: boolean = false;
  constructor() {
    super({ key: "BootScene" });
  }

  public init() {
    if (this.loaded) {
      this.runStartupProcess();
    }
  }
  private runStartupProcess() {
    const centerX = this.game.canvas.width / 2;
    const centerY = this.game.canvas.height / 2;
    const animationHelper = new AnimationHelper(this);
    animationHelper.createGameAnimations(
      this.cache.json.get("ryanAndLoAnimation").anims
    );
    const sprite = this.add.sprite(centerX, centerY, "ryanandlo");
    sprite.scaleX = 1;
    sprite.scaleY = 1;
    sprite.anims.play("shine-in");
    sprite.on("animationcomplete", () => {
      this.add.text(centerX + 200, centerY + 100, "Catshape Daruma®", {
        fontFamily: "pixel",
        fontSize: "20px",
        color: BLACK.str,
      });

      setTimeout(() => {
        this.scene.start("MainScene");
        this.scene.start("StateScene");
        this.scene.start("UIScene");
      }, 1);
    });
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(WHITE.hex);
    this.createLoadingGraphics();
    this.load.on("complete", () => {
      this.loaded = true;
      this.runStartupProcess();
    });
    // Load the packages
    this.load.pack(
      "preload_spritesheets",
      "./src/assets/pack/spritesheets.json",
      "preload_spritesheets"
    );
    this.load.pack(
      "preload_images",
      "./src/assets/pack/image.json",
      "preload_images"
    );
    this.load.pack(
      "preload_audio",
      "./src/assets/pack/audio.json",
      "preload_audio"
    );
    this.load.pack(
      "preload_data",
      "./src/assets/pack/data.json",
      "preload_data"
    );
    this.load.pack(
      "preload_tilemaps",
      "./src/assets/pack/tilemaps.json",
      "preload_tilemaps"
    );

    this.load.pack("preload", "./src/assets/pack.json", "preload");

    preloadSceneDependencies(this, [UIScene, StateScene, MainScene]);
  }
  private createLoadingGraphics(): void {
    // We can specify the type of config we want to send.
  }
}
