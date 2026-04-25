import { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '@open-privy-expo-app/navigation/SettingsStack';
import { useTheme } from "@open-privy-expo-app/theme";

const WEBSITE_URL = 'https://jacobhomanics.com';

type Props = NativeStackScreenProps<SettingsStackParamList, 'About'>;

export default function AboutScreen({ navigation }: Props) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.background,
        },
        content: {
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 56,
          paddingBottom: 48,
        },
        backButton: {
          position: 'absolute',
          top: 56,
          left: 24,
          padding: 10,
          borderRadius: 20,
          backgroundColor: theme.border,
          zIndex: 10,
        },
        title: {
          fontSize: 28,
          fontWeight: '700',
          color: theme.text,
          marginBottom: 40,
          textAlign: 'center',
        },
        presentedBy: {
          fontSize: 16,
          color: theme.textSecondary,
          textAlign: 'center',
          marginBottom: 12,
        },
        name: {
          fontSize: 24,
          fontWeight: '700',
          color: theme.text,
          textAlign: 'center',
          marginBottom: 24,
        },
        link: {
          alignSelf: 'center',
          paddingVertical: 8,
          paddingHorizontal: 12,
        },
        linkText: {
          fontSize: 16,
          fontWeight: '600',
          color: theme.primary,
          textDecorationLine: 'underline',
        },
      }),
    [theme]
  );

  const openWebsite = () => {
    void Linking.openURL(WEBSITE_URL);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.8 }]}
        onPress={() => navigation.goBack()}
        accessibilityLabel="Back to settings"
      >
        <Ionicons name="arrow-back" size={24} color={theme.text} />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.presentedBy}>Presented to you by</Text>
        <Text style={styles.name}>Jacob Homanics</Text>
        <Pressable
          style={({ pressed }) => [styles.link, pressed && { opacity: 0.7 }]}
          onPress={openWebsite}
          accessibilityRole="link"
          accessibilityLabel="Open jacobhomanics.com"
        >
          <Text style={styles.linkText}>{WEBSITE_URL}</Text>
        </Pressable>
      </View>
    </View>
  );
}
