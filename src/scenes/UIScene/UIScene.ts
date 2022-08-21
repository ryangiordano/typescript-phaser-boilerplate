import { UIBar } from "../../components/UI/UIBar";
import DependentScene from "../DependentScene";
import { buildNotificationUI } from "./NotificationUI";
import NotificationView from "../../components/UI/Notification";
import { buildTooltipUI } from "./TooltipUI";

export class UIScene extends DependentScene {
  private UIParent: Phaser.GameObjects.Container;
  constructor() {
    super({
      key: "UIScene",
    });
  }

  static spriteDependencies: SpriteDependency[] = [
    ...UIBar.spriteDependencies,
    ...NotificationView.spriteDependencies,
  ];
  static audioDependencies: AudioDependency[] = [];

  preload(): void {}

  create(): void {
    this.buildUIParent();
    buildNotificationUI(this);
    buildTooltipUI(this);
  }

  /** Where all of the UI on the bottom of the screen lives */
  private buildUIParent() {
    this.UIParent = this.add.container(60, this.game.canvas.height - 100);
  }

  update(time: number, delta: number): void {}
}
