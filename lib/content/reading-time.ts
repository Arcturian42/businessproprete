/**
 * Estimate reading time (minutes) from raw text.
 * 220 wpm — average French reading speed for technical content.
 */
export function estimateReadingTime(text: string, wpm = 220): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}
