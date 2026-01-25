import { describe, it, expect } from 'vitest';

describe('FloatingText', () => {
  // Note: Full tests require Phaser scene mocking
  it('should be importable', async () => {
    const module = await import('./FloatingText');
    expect(module.FloatingText).toBeDefined();
  });
});
