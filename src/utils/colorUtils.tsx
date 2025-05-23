/**
 * Generates a color slightly different from the given base HSL color
 * by adjusting its lightness (L) value by a specified difference amount.
 *
 * The function expects the input color to be in the HSL format: `hsl(H, S%, L%)`.
 * It parses the hue (H), saturation (S), and lightness (L) components from the input,
 * then modifies the lightness by either increasing or decreasing it by `diff` value,
 * randomly choosing the direction.
 *
 * The lightness value is clamped between 0 and 100 to ensure valid HSL color output.
 * If the input format is invalid and doesn't match HSL, the original color is returned as-is.
 *
 * @param {string} base - The base color string in HSL format (e.g., 'hsl(210, 70%, 50%)').
 * @param {number} diff - The amount to adjust the lightness value by (positive integer).
 * @returns {string} A new HSL color string with modified lightness.
 *
 * @example
 * getDifferentColor('hsl(210, 70%, 50%)', 5)
 * // Might return 'hsl(210, 70%, 55%)' or 'hsl(210, 70%, 45%)'
 */
export function getDifferentColor(base: string, diff: number): string {
  const regex = /hsl\((\d+), (\d+)%?, (\d+)%?\)/;
  const match = base.match(regex);

  if (!match) return base;

  const h = parseInt(match[1]);
  const s = parseInt(match[2]);
  let l = parseInt(match[3]);
  l = Math.max(0, Math.min(100, l + (Math.random() > 0.5 ? diff : -diff)));

  return `hsl(${h}, ${s}%, ${l}%)`;
}

export const BASE_COLORS = [
  'hsl(210, 70%, 50%)',
  'hsl(120, 70%, 50%)',
  'hsl(0, 70%, 50%)',
  'hsl(45, 70%, 50%)',
  'hsl(270, 70%, 50%)',
  'hsl(30, 70%, 50%)',
  'hsl(330, 70%, 50%)',
];
