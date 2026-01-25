import { describe, it, expect, vi } from 'vitest';
import { MoveCommand, FollowCommand, InteractCommand } from './Command';
import { Commandable, Followable } from '../core/types';

function createMockUnit(): Commandable {
  return {
    moveTo: vi.fn(),
    followTarget: vi.fn(),
  };
}

function createMockTarget(): Followable {
  return {
    x: 100,
    y: 200,
    getRadius: () => 10,
  };
}

describe('MoveCommand', () => {
  it('calls moveTo with position near target', () => {
    const unit = createMockUnit();
    const command = new MoveCommand(100, 200, 0); // No spread for predictable test

    command.execute(unit);

    expect(unit.moveTo).toHaveBeenCalledWith(100, 200);
  });

  it('adds spread to position', () => {
    const unit = createMockUnit();
    const command = new MoveCommand(100, 200, 30);

    command.execute(unit);

    expect(unit.moveTo).toHaveBeenCalled();
    const [x, y] = (unit.moveTo as ReturnType<typeof vi.fn>).mock.calls[0];
    // Position should be within spread radius of target
    const distance = Math.sqrt(Math.pow(x - 100, 2) + Math.pow(y - 200, 2));
    expect(distance).toBeLessThanOrEqual(30);
  });
});

describe('FollowCommand', () => {
  it('calls followTarget with persistent flag', () => {
    const unit = createMockUnit();
    const target = createMockTarget();
    const command = new FollowCommand(target);

    command.execute(unit);

    expect(unit.followTarget).toHaveBeenCalledWith(target, undefined, true);
  });
});

describe('InteractCommand', () => {
  it('calls followTarget with callback', () => {
    const unit = createMockUnit();
    const target = createMockTarget();
    const onArrive = vi.fn();
    const command = new InteractCommand(target, onArrive);

    command.execute(unit);

    expect(unit.followTarget).toHaveBeenCalledWith(target, onArrive);
  });
});
