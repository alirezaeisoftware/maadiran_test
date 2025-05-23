import { describe, it, expect, vi } from 'vitest';
import { getDifferentColor, BASE_COLORS } from './colorUtils';

describe('getDifferentColor', () => {
  const baseColor = 'hsl(210, 70%, 50%)';

  it('returns color in valid HSL format', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.6);
    const result = getDifferentColor(baseColor, 10);
    expect(result).toMatch(/^hsl\(\d+, \d+%?, \d+%?\)$/);
  });

  it('increases lightness if Math.random > 0.5', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const result = getDifferentColor(baseColor, 10);
    expect(result).toBe('hsl(210, 70%, 60%)');
  });

  it('decreases lightness if Math.random <= 0.5', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    const result = getDifferentColor(baseColor, 10);
    expect(result).toBe('hsl(210, 70%, 40%)');
  });

  it('clamps lightness between 0 and 100', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    const result = getDifferentColor('hsl(210, 70%, 5%)', 10);
    expect(result).toBe('hsl(210, 70%, 0%)');

    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const result2 = getDifferentColor('hsl(210, 70%, 95%)', 10);
    expect(result2).toBe('hsl(210, 70%, 100%)');
  });

  it('returns base if format is invalid', () => {
    const result = getDifferentColor('invalid-color', 10);
    expect(result).toBe('invalid-color');
  });
});

describe('BASE_COLORS', () => {
  it('contains valid HSL color strings', () => {
    for (const color of BASE_COLORS) {
      expect(color).toMatch(/^hsl\(\d+, \d+%?, \d+%?\)$/);
    }
  });
});
