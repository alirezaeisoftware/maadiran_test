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
  "hsl(210, 70%, 50%)",
  "hsl(120, 70%, 50%)",
  "hsl(0, 70%, 50%)",
  "hsl(45, 70%, 50%)",
  "hsl(270, 70%, 50%)",
  "hsl(30, 70%, 50%)",
  "hsl(330, 70%, 50%)",
];
