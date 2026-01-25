import Phaser from 'phaser';

/**
 * Event types that can be emitted through the scene's event system.
 * Use scene.events.emit(GameEvents.HEAL, payload) to trigger.
 */
export const GameEvents = {
  FLOATING_TEXT: 'game:floatingText',
  HEAL: 'game:heal',
  DAMAGE: 'game:damage',
  LEVEL_UP: 'game:levelUp',
} as const;

/** Payload for floating text event */
export interface FloatingTextEvent {
  x: number;
  y: number;
  text: string;
  color?: string;
  fontSize?: number;
}

/** Payload for heal event */
export interface HealEvent {
  x: number;
  y: number;
  amount: number;
}

/** Payload for damage event */
export interface DamageEvent {
  x: number;
  y: number;
  amount: number;
}

/** Payload for level up event */
export interface LevelUpEvent {
  x: number;
  y: number;
}

/** Handler functions for game events */
export interface GameEventHandlers {
  onFloatingText?: (payload: FloatingTextEvent) => void;
  onHeal?: (payload: HealEvent) => void;
  onDamage?: (payload: DamageEvent) => void;
  onLevelUp?: (payload: LevelUpEvent) => void;
}

/**
 * Listens for game events on the scene and dispatches to handlers.
 * Decouples game logic from visual feedback - you provide the handlers.
 *
 * Usage:
 *   // In scene create():
 *   const floatingText = new FloatingText(this);
 *   this.eventManager = new GameEventManager(this, {
 *     onHeal: ({ x, y, amount }) => floatingText.showHeal(x, y, amount),
 *     onDamage: ({ x, y, amount }) => floatingText.showDamage(x, y, amount),
 *   });
 *
 *   // Anywhere with scene access:
 *   scene.events.emit(GameEvents.HEAL, { x: 100, y: 100, amount: 5 });
 */
export class GameEventManager {
  private scene: Phaser.Scene;
  private handlers: GameEventHandlers;

  constructor(scene: Phaser.Scene, handlers: GameEventHandlers = {}) {
    this.scene = scene;
    this.handlers = handlers;

    this.setupListeners();
  }

  private setupListeners(): void {
    const events = this.scene.events;

    // Generic floating text
    events.on(GameEvents.FLOATING_TEXT, (payload: FloatingTextEvent) => {
      this.handlers.onFloatingText?.(payload);
    });

    // Heal event
    events.on(GameEvents.HEAL, (payload: HealEvent) => {
      this.handlers.onHeal?.(payload);
    });

    // Damage event
    events.on(GameEvents.DAMAGE, (payload: DamageEvent) => {
      this.handlers.onDamage?.(payload);
    });

    // Level up event
    events.on(GameEvents.LEVEL_UP, (payload: LevelUpEvent) => {
      this.handlers.onLevelUp?.(payload);
    });

    // Clean up listeners when scene shuts down
    this.scene.events.once('shutdown', () => {
      this.destroy();
    });
  }

  /** Remove all event listeners */
  public destroy(): void {
    const events = this.scene.events;
    events.off(GameEvents.FLOATING_TEXT);
    events.off(GameEvents.HEAL);
    events.off(GameEvents.DAMAGE);
    events.off(GameEvents.LEVEL_UP);
  }
}
