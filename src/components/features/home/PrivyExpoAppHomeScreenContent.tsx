import { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@open-privy-expo-app/theme";

export default function PrivyExpoAppHomeScreenContent() {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        topRightWidget: {
          position: 'absolute',
          right: 16,
          zIndex: 10,
        },
        title: {
          fontSize: 28,
          fontWeight: '700',
          color: theme.text,
          marginBottom: 12,
          textAlign: 'center',
        },
        subtitle: {
          fontSize: 16,
          color: theme.textSecondary,
          textAlign: 'center',
        },
        iconWrap: {
          marginBottom: 24,
        },
        actionButton: {
          marginTop: 20,
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: 10,
          backgroundColor: theme.primary,
        },
        actionButtonText: {
          fontSize: 16,
          fontWeight: '700',
          color: theme.primaryContrast,
        },
      }),
    [theme]
  );

  return (
    <>
      <View style={styles.iconWrap}>
        <Ionicons name="dice-outline" size={64} color={theme.primary} />
      </View>
      <Text style={styles.title}>Open Privy Expo App</Text>
      <Text style={styles.subtitle}>Main app content goes here</Text>
      <Pressable
        style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.85 }]}
        onPress={() => { }}
        accessibilityLabel="Open Privy Expo App"
      >
        <Text style={styles.actionButtonText}>Open Privy Expo App</Text>
      </Pressable>
    </>
  );
}
