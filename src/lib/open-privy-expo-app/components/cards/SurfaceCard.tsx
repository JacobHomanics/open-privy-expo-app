import { useMemo, type ReactNode } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function SurfaceCard({ children, style }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          backgroundColor: theme.border,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        },
      }),
    [theme]
  );

  return <View style={[styles.root, style]}>{children}</View>;
}
