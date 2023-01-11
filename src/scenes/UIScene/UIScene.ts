import { UIBar } from "../../components/UI/UIBar";
import NotificationView from "../../components/UI/Notification";
import { buildTooltipUI, useNotificationUI } from "daruma-phaser-helpers";

export class UIScene extends Phaser.Scene {
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
    const { triggerNotification } = useNotificationUI(this, {
      position: { x: 0, y: 0 },
    });
    buildTooltipUI(this);
  }

  /** Where all of the UI on the bottom of the screen lives */
  private buildUIParent() {
    this.UIParent = this.add.container(60, this.game.canvas.height - 100);
  }

  update(time: number, delta: number): void {}
}
