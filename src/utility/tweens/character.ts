import { TweenFactory } from "./TweenBuilder";

const builder = new TweenFactory();

const forwardMove = (target, distance) =>
  builder.createTween(target, 50, 0).toX(distance).setYoyo().getConfig();

const flash = (target) =>
  builder.createTween(target, 50, 0).fadeOut().setYoyo().getConfig();

const scale = (target) =>
  builder.createTween(target, 50, 0).scaleX(0.1, 1).scaleY(0.1, 1).getConfig();

export const characterAttack = (
  target,
  distance,
  delay,
  scene: Phaser.Scene,
  onComplete
) => {
  const timeline = scene.tweens.createTimeline({
    targets: target,
    ease: "Linear",
    delay,
  });
  timeline.add(forwardMove(target, distance));
  timeline.setCallback("onComplete", onComplete);
  return timeline;
};

export const characterDamage = (
  target,
  delay,
  scene: Phaser.Scene,
  onComplete
) => {
  const timeline = scene.tweens.createTimeline({
    targets: target,
    ease: "Linear",
    delay,
  });
  timeline.add(flash(target));
  timeline.add(flash(target));
  timeline.setCallback("onComplete", onComplete);
  return timeline;
};
