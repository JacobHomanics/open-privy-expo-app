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
import {
  formatGoogleOAuthDisplay,
  formatTwitterOAuthDisplay,
  getEmail,
  getGoogleOAuthAccount,
  getPhone,
  getTwitterOAuthAccount,
  hasAppleOAuthLinkedAccount,
} from '../../../../utils/privy';
import { copyOrShare } from '@open-privy-expo-app/utils/utils';
import { resetRootStackToWelcome } from '@open-privy-expo-app/navigation/resetRootStackToWelcome';

type Props = NativeStackScreenProps<SettingsStackParamList, 'LinkedAccounts'>;

export default function LinkedAccountsScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const { user, isReady } = usePrivy();

  const email = getEmail(user ?? null);
  const phone = getPhone(user ?? null);
  const googleOAuth = getGoogleOAuthAccount(user ?? null);
  const twitterOAuth = getTwitterOAuthAccount(user ?? null);
  const signedInWithApple = hasAppleOAuthLinkedAccount(user ?? null);

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
        appleIconBelowPhone: {
          alignItems: 'center',
          marginBottom: 16,
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
      }),
    [theme]
  );

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
        accessibilityLabel="Back to settings"
      >
        <Ionicons name="arrow-back" size={24} color={theme.text} />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.title}>Linked accounts</Text>

        <View style={styles.card}>
          <View style={styles.labelRow}>
            <Text style={styles.cardLabel}>Email</Text>
            {email ? (
              <Pressable
                style={({ pressed }) => [styles.copyButton, pressed && { opacity: 0.8 }]}
                onPress={() => copyOrShare(email, 'Email')}
                accessibilityLabel="Copy email"
              >
                <Ionicons name="copy-outline" size={20} color={theme.text} />
              </Pressable>
            ) : (
              <Pressable
                style={({ pressed }) => [styles.copyButton, pressed && { opacity: 0.8 }]}
                onPress={() => navigation.navigate('LinkAccountEmail')}
                accessibilityLabel="Link email"
              >
                <Ionicons name="add-outline" size={20} color={theme.primary} />
              </Pressable>
            )}
          </View>
          <Text style={styles.cardValue} numberOfLines={1} ellipsizeMode="middle">
            {email ?? '—'}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.labelRow}>
            <Text style={styles.cardLabel}>Phone number</Text>
            {phone ? (
              <Pressable
                style={({ pressed }) => [styles.copyButton, pressed && { opacity: 0.8 }]}
                onPress={() => copyOrShare(phone, 'Phone number')}
                accessibilityLabel="Copy phone number"
              >
                <Ionicons name="copy-outline" size={20} color={theme.text} />
              </Pressable>
            ) : (
              <Pressable
                style={({ pressed }) => [styles.copyButton, pressed && { opacity: 0.8 }]}
                onPress={() => navigation.navigate('LinkAccountPhoneNumber')}
                accessibilityLabel="Link phone number"
              >
                <Ionicons name="add-outline" size={20} color={theme.primary} />
              </Pressable>
            )}
          </View>
          <Text style={styles.cardValue} numberOfLines={1} ellipsizeMode="middle">
            {phone ?? '—'}
          </Text>
        </View>

        {googleOAuth ? (
          <View style={styles.card}>
            <View style={styles.labelRow}>
              <Text style={styles.cardLabel}>Google account</Text>
              <Pressable
                style={({ pressed }) => [styles.copyButton, pressed && { opacity: 0.8 }]}
                onPress={() =>
                  copyOrShare(
                    googleOAuth.email ??
                    googleOAuth.name ??
                    googleOAuth.subject,
                    'Google account'
                  )
                }
                accessibilityLabel="Copy Google account"
              >
                <Ionicons name="copy-outline" size={20} color={theme.text} />
              </Pressable>
            </View>
            <Text style={styles.cardValue} numberOfLines={1} ellipsizeMode="middle">
              {formatGoogleOAuthDisplay(googleOAuth)}
            </Text>
          </View>
        ) : null}

        {signedInWithApple ? (
          <View
            style={styles.appleIconBelowPhone}
            accessibilityRole="image"
            accessibilityLabel="Signed in with Apple"
          >
            <Ionicons name="logo-apple" size={30} color={theme.text} />
          </View>
        ) : null}

        {twitterOAuth ? (
          <View style={styles.card}>
            <View style={styles.labelRow}>
              <Text style={styles.cardLabel}>X account</Text>
              <Pressable
                style={({ pressed }) => [styles.copyButton, pressed && { opacity: 0.8 }]}
                onPress={() =>
                  copyOrShare(
                    twitterOAuth.username
                      ? `@${twitterOAuth.username}`
                      : twitterOAuth.subject,
                    'X account'
                  )
                }
                accessibilityLabel="Copy X account"
              >
                <Ionicons name="copy-outline" size={20} color={theme.text} />
              </Pressable>
            </View>
            <Text style={styles.cardValue} numberOfLines={1} ellipsizeMode="middle">
              {formatTwitterOAuthDisplay(twitterOAuth)}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
