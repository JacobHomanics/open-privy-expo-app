import { useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '@open-privy-expo-app/navigation/SettingsStack';
import { useTheme } from "@open-privy-expo-app/theme";
import { copyOrShare } from '@open-privy-expo-app/utils/utils';
import SecondaryButton from '@open-privy-expo-app/components/buttons/SecondaryButton';
import { resetRootStackToWelcome } from '@open-privy-expo-app/navigation/resetRootStackToWelcome';

type Props = NativeStackScreenProps<SettingsStackParamList, 'SettingsMain'>;

export default function SettingsMainScreen({ navigation }: Props) {
  const { theme, mode, toggleMode } = useTheme();
  const { user, logout, isReady } = usePrivy();
  const did = user?.id ?? null;

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
        title: {
          fontSize: 28,
          fontWeight: '700',
          color: theme.text,
          marginBottom: 32,
          textAlign: 'center',
        },
        card: {
          backgroundColor: theme.border,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        },
        cardLabel: {
          fontSize: 12,
          fontWeight: '600',
          color: theme.textSecondary,
          textTransform: 'uppercase',
        },
        labelRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 6,
        },
        cardValue: {
          fontSize: 14,
          color: theme.text,
          fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        },
        copyButton: {
          padding: 8,
          borderRadius: 8,
          backgroundColor: theme.background,
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
        toggleButton: {
          position: 'absolute',
          top: 56,
          right: 24,
          padding: 10,
          borderRadius: 20,
          backgroundColor: theme.border,
          zIndex: 10,
        },
      }),
    [theme]
  );

  const handleLogout = async () => {
    await logout();
    resetRootStackToWelcome(navigation);
  };

  useEffect(() => {
    if (isReady && !user) {
      resetRootStackToWelcome(navigation);
    }
  }, [isReady, user, navigation]);

  if (!isReady || !user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.8 }]}
        onPress={() => navigation.goBack()}
        accessibilityLabel="Back to profile"
      >
        <Ionicons name="arrow-back" size={24} color={theme.text} />
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.toggleButton, pressed && { opacity: 0.8 }]}
        onPress={toggleMode}
        accessibilityLabel={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        <Ionicons
          name={mode === 'light' ? 'moon-outline' : 'sunny-outline'}
          size={24}
          color={theme.text}
        />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.card}>
          <View style={styles.labelRow}>
            <Text style={styles.cardLabel}>Privy DID</Text>
            {did ? (
              <Pressable
                style={({ pressed }) => [styles.copyButton, pressed && { opacity: 0.8 }]}
                onPress={() => copyOrShare(did, 'Privy DID')}
                accessibilityLabel="Copy Privy DID"
              >
                <Ionicons name="copy-outline" size={20} color={theme.text} />
              </Pressable>
            ) : null}
          </View>
          <Text style={styles.cardValue} numberOfLines={1} ellipsizeMode="middle">
            {did ?? '—'}
          </Text>
        </View>

        <SecondaryButton
          label="Linked accounts"
          icon="link-outline"
          onPress={() => navigation.navigate('LinkedAccounts')}
          style={{ marginTop: 24 }}
        />
        <SecondaryButton
          label="Wallet settings"
          icon="wallet-outline"
          onPress={() => navigation.getParent()?.navigate('WalletSettings')}
          style={{ marginTop: 12 }}
        />
        <SecondaryButton
          label="About"
          icon="information-circle-outline"
          onPress={() => navigation.navigate('About')}
          style={{ marginTop: 12 }}
        />
        <SecondaryButton
          label="Log out"
          icon="log-out-outline"
          onPress={handleLogout}
          style={{ marginTop: 12 }}
        />
      </View>
    </View>
  );
}
