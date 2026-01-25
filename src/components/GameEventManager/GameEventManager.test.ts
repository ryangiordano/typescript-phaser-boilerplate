import { describe, it, expect } from 'vitest';

describe('GameEventManager', () => {
  // Note: Full tests require Phaser scene mocking
  it('exports GameEvents constants', async () => {
    const module = await import('./GameEventManager');
    expect(module.GameEvents.HEAL).toBe('game:heal');
    expect(module.GameEvents.DAMAGE).toBe('game:damage');
    expect(module.GameEvents.LEVEL_UP).toBe('game:levelUp');
    expect(module.GameEvents.FLOATING_TEXT).toBe('game:floatingText');
  });
});
