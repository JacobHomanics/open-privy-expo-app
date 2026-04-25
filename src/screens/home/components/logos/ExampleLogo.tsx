import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";

export default function ExampleLogo() {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        logoMark: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          gap: 2,
          backgroundColor: theme.border,
          width: 64,
          height: 64,
          borderRadius: 32,
          padding: 12,
        },
        logoMarkH: {
          fontSize: 28,
          fontWeight: '800',
          color: theme.primary,
          letterSpacing: -1,
        },
        logoMarkComma: {
          fontSize: 28,
          fontWeight: '800',
          color: theme.textSecondary,
          marginLeft: -2,
        },
        logoMarkP: {
          fontSize: 28,
          fontWeight: '800',
          color: theme.primary,
          letterSpacing: -1,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.logoMark}>
      <Text style={styles.logoMarkH}>OP</Text>
    </View>
  );
}
