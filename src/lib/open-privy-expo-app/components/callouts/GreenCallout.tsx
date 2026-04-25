import { useMemo, type ReactNode } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";

export function useGreenCalloutStyles() {
  const { mode } = useTheme();
  return useMemo(() => {
    const iconColor = mode === 'dark' ? '#86efac' : '#166534';
    return {
      iconColor,
      styles: StyleSheet.create({
        root: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 12,
          padding: 14,
          borderRadius: 12,
          marginBottom: 16,
          backgroundColor: mode === 'dark' ? 'rgba(34, 197, 94, 0.12)' : '#ecfdf5',
          borderWidth: 1,
          borderColor: mode === 'dark' ? 'rgba(34, 197, 94, 0.35)' : '#a7f3d0',
        },
        iconWrap: {
          paddingTop: 2,
        },
        content: {
          flex: 1,
        },
        text: {
          fontSize: 14,
          lineHeight: 20,
          color: iconColor,
        },
        link: {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: '600',
          textDecorationLine: 'underline',
          color: mode === 'dark' ? '#bbf7d0' : '#14532d',
        },
      }),
    };
  }, [mode]);
}

export type GreenCalloutStyles = ReturnType<typeof useGreenCalloutStyles>;

type GreenCalloutProps = {
  /** Result of `useGreenCalloutStyles()` from the parent (keeps one theme subscription). */
  stylesBundle: GreenCalloutStyles;
  icon?: ReactNode;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function GreenCallout({ stylesBundle, icon, children, style }: GreenCalloutProps) {
  const { styles } = stylesBundle;
  return (
    <View style={[styles.root, style]}>
      {icon ? (
        <View style={styles.iconWrap} importantForAccessibility="no-hide-descendants">
          {icon}
        </View>
      ) : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}
