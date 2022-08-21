import DependentScene from "../DependentScene";
import {
  buildNotificationManagement,
  NotificationManager,
} from "./NotificationManagement";
import { getSaveData } from "../../assets/data/player/SaveController";

export class StateScene extends DependentScene {
  public notificationManager: NotificationManager;
  constructor() {
    super({
      key: "StateScene",
    });
  }

  preload(): void {}

  create(): void {
    const save = getSaveData();
    this.notificationManager = buildNotificationManagement(this);
  }

  update(time: number, delta: number): void {}
}
