import { describe, it, expect } from 'vitest';
import { hpColorFn } from './StatBar';

describe('StatBar', () => {
  describe('hpColorFn', () => {
    it('returns green when HP > 50%', () => {
      expect(hpColorFn(0.75)).toBe(0x00ff00);
      expect(hpColorFn(0.51)).toBe(0x00ff00);
    });

    it('returns yellow when HP is 25-50%', () => {
      expect(hpColorFn(0.5)).toBe(0xffff00);
      expect(hpColorFn(0.26)).toBe(0xffff00);
    });

    it('returns red when HP <= 25%', () => {
      expect(hpColorFn(0.25)).toBe(0xff0000);
      expect(hpColorFn(0.1)).toBe(0xff0000);
      expect(hpColorFn(0)).toBe(0xff0000);
    });
  });

  // Note: Full StatBar tests require Phaser scene mocking
  // Add integration tests when running in a Phaser environment
});
