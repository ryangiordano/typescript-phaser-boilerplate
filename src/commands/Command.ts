import { Commandable, Followable, Combatable } from '../core/types';

/**
 * Base interface for all commands.
 * Commands encapsulate actions that can be executed on a unit.
 */
export interface Command {
  execute(unit: Commandable): void;
}

/**
 * Command to move a unit to a specific position.
 * Each unit gets a random offset to spread them around the target point.
 */
export class MoveCommand implements Command {
  private readonly spreadRadius: number;

  constructor(
    private readonly x: number,
    private readonly y: number,
    spreadRadius: number = 30
  ) {
    this.spreadRadius = spreadRadius;
  }

  execute(unit: Commandable): void {
    // Add random offset so units don't all clump at the same point
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * this.spreadRadius;
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    unit.moveTo(this.x + offsetX, this.y + offsetY);
  }
}

/**
 * Interface for units that can enter combat mode.
 * Implement this on game objects that can fight.
 */
export interface CombatCapable {
  enterCombat(target: Combatable, onDefeated: () => void): void;
}

/**
 * Command to attack a combatable target (enemy, etc.)
 * Immediately enters combat mode - combat handles approach and attacking.
 */
export class AttackCommand implements Command {
  constructor(
    private readonly target: Combatable,
    private readonly onDefeat?: () => void
  ) {}

  execute(unit: Commandable): void {
    // Enter combat immediately - combat mode handles moving to attack range
    if ('enterCombat' in unit && typeof (unit as CombatCapable).enterCombat === 'function') {
      (unit as CombatCapable).enterCombat(this.target, this.onDefeat ?? (() => {}));
    }
  }
}

/**
 * Command to follow a target continuously.
 * Unit keeps following until given another command.
 */
export class FollowCommand implements Command {
  constructor(private readonly target: Followable) {}

  execute(unit: Commandable): void {
    // Persistent follow - unit stays with target until given new command
    unit.followTarget(this.target, undefined, true);
  }
}

/**
 * Command to interact with a followable target.
 * Generic version for pickups, interactables, etc.
 */
export class InteractCommand implements Command {
  constructor(
    private readonly target: Followable,
    private readonly onArrive: () => void
  ) {}

  execute(unit: Commandable): void {
    unit.followTarget(this.target, this.onArrive);
  }
}
