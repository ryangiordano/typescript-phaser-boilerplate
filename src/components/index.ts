// Phaser game components
export { StatBar, UnitStatBars, HP_BAR_DEFAULTS, MP_BAR_DEFAULTS, XP_BAR_DEFAULTS, hpColorFn } from './StatBar';
export type { StatBarConfig, UnitStatBarsConfig } from './StatBar';

export { EdgeScrollCamera } from './EdgeScrollCamera';
export type { EdgeScrollCameraConfig, EdgeScrollState } from './EdgeScrollCamera';

export { SelectionManager } from './SelectionManager';

export { GameEventManager, GameEvents } from './GameEventManager';
export type { GameEventHandlers, FloatingTextEvent, HealEvent, DamageEvent, LevelUpEvent } from './GameEventManager';
