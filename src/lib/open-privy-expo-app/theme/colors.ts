/**
 * Base color palette. Use semantic tokens from light/dark for component styling.
 */
export const palette = {
  // Neutrals
  cream: '#f5f2eb',
  slate: '#1e293b',
  slateLight: '#334155',
  slateDark: '#0f172a',
  mist: '#94a3b8',
  silver: '#cbd5e1',
  // Accent
  amber: '#f59e0b',
  amberDark: '#d97706',
  amberLight: '#fcd34d',
} as const;

export type ColorPalette = typeof palette;

/** Semantic colors for light theme */
export const light = {
  background: palette.cream,
  text: palette.slateDark,
  textSecondary: palette.slateLight,
  primary: palette.amber,
  primaryContrast: palette.slateDark,
  border: palette.silver,
} as const;

/** Semantic colors for dark theme */
export const dark = {
  background: palette.slateDark,
  text: palette.cream,
  textSecondary: palette.mist,
  primary: palette.amber,
  primaryContrast: palette.slateDark,
  border: palette.slateLight,
} as const;

/** Runtime tokens for light or dark; widened to `string` so unions work with `??` and style props. */
export type Theme = {
  readonly background: string;
  readonly text: string;
  readonly textSecondary: string;
  readonly primary: string;
  readonly primaryContrast: string;
  readonly border: string;
};
