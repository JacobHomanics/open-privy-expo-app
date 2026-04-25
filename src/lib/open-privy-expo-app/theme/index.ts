import { light } from './colors';

export { palette, light, dark } from './colors';
export type { Theme, ColorPalette } from './colors';
export { ThemeProvider, useTheme } from './ThemeContext';

/** Default theme when not using ThemeProvider (e.g. in theme/colors tests). */
export const theme = light;
