export const SharedToggleButtonProperties = {
    lightIconName: 'moon-outline',
    darkIconName: 'sunny-outline',
    lightAccessibilityLabel: 'Switch to dark mode',
    darkAccessibilityLabel: 'Switch to light mode',
} as const;

export type SharedToggleButtonProperties = typeof SharedToggleButtonProperties;