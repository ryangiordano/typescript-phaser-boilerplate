import { describe, it, expect, vi } from 'vitest';
import { TickSystem } from './TickSystem';

describe('TickSystem', () => {
  it('processes ticks after interval elapses', () => {
    const system = new TickSystem(100); // 100ms per tick
    const onTick = vi.fn();

    system.register({
      id: 'test',
      target: {},
      onTick,
      ticksRemaining: 3,
    });

    // Not enough time for a tick
    system.update(50);
    expect(onTick).not.toHaveBeenCalled();

    // Now we hit 100ms
    system.update(50);
    expect(onTick).toHaveBeenCalledTimes(1);

    // Two more ticks worth of time
    system.update(200);
    expect(onTick).toHaveBeenCalledTimes(3);
  });

  it('removes effects when ticks run out', () => {
    const system = new TickSystem(100);
    const onExpire = vi.fn();

    system.register({
      id: 'test',
      target: {},
      onTick: vi.fn(),
      ticksRemaining: 2,
      onExpire,
    });

    expect(system.hasEffect('test')).toBe(true);

    // Two ticks should expire the effect
    system.update(200);
    expect(system.hasEffect('test')).toBe(false);
    expect(onExpire).toHaveBeenCalled();
  });

  it('pauses and resumes', () => {
    const system = new TickSystem(100);
    const onTick = vi.fn();

    system.register({
      id: 'test',
      target: {},
      onTick,
      ticksRemaining: 10,
    });

    system.pause();
    system.update(500);
    expect(onTick).not.toHaveBeenCalled();

    system.resume();
    system.update(100);
    expect(onTick).toHaveBeenCalledTimes(1);
  });

  it('clears effects for a specific target', () => {
    const system = new TickSystem(100);
    const target1 = { id: 1 };
    const target2 = { id: 2 };

    system.register({ id: 'a', target: target1, onTick: vi.fn(), ticksRemaining: 10 });
    system.register({ id: 'b', target: target1, onTick: vi.fn(), ticksRemaining: 10 });
    system.register({ id: 'c', target: target2, onTick: vi.fn(), ticksRemaining: 10 });

    system.clearEffectsForTarget(target1);

    expect(system.hasEffect('a')).toBe(false);
    expect(system.hasEffect('b')).toBe(false);
    expect(system.hasEffect('c')).toBe(true);
  });
});
