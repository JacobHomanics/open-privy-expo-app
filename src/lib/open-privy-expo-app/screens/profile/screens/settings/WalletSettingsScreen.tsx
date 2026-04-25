import { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePrivy, useEmbeddedEthereumWallet, useMfaEnrollment } from '@privy-io/expo';
import { useMfaEnrollmentUI } from '@privy-io/expo/ui';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import { getWalletAddress, isPrivyMfaEnabled } from '@open-privy-expo-app/utils/privy';
import { copyOrShare } from '@open-privy-expo-app/utils/utils';
import GreenCallout, {
  useGreenCalloutStyles,
} from '@open-privy-expo-app/components/callouts/GreenCallout';
import SecondaryButton from '@open-privy-expo-app/components/buttons/SecondaryButton';
import SurfaceCard from '@open-privy-expo-app/components/cards/SurfaceCard';
import ErrorBottomSheet, {
  type ErrorBottomSheetRef,
} from '@open-privy-expo-app/components/bottom-sheets/ErrorBottomSheet';
import { mfaMethods, PRIVY_MFA_RELYING_PARTY } from '@open-privy-expo-app/configs/privy';

const PRIVY_HOME_LOGIN_URL = 'https://home.privy.io/login';

type Props = NativeStackScreenProps<RootStackParamList, 'WalletSettings'>;

export default function WalletSettingsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const greenCallout = useGreenCalloutStyles();
  const walletErrorSheetRef = useRef<ErrorBottomSheetRef>(null);
  const [walletErrorSheetMessage, setWalletErrorSheetMessage] = useState<string | null>(null);
  const { user } = usePrivy();
  const wallet = useEmbeddedEthereumWallet();
  const { init: initMfaEnrollmentUI } = useMfaEnrollmentUI();
  const { unenrollMfa } = useMfaEnrollment();

  const mfaEnabled = isPrivyMfaEnabled(user);

  const startMfaEnrollment = useCallback(async () => {
    if (!PRIVY_MFA_RELYING_PARTY) {
      setWalletErrorSheetMessage(
        'Two-factor authentication\n\nSet EXPO_PUBLIC_PRIVY_MFA_RELYING_PARTY (HTTPS origin of a domain with Apple App Site Association / Digital Asset Links) or EXPO_PUBLIC_FARCASTER_RELYING_PARTY. Enable MFA in the Privy dashboard. See https://docs.privy.io/guide/security/mfa'
      );
      return;
    }
    try {
      await initMfaEnrollmentUI({
        mfaMethods: mfaMethods,
        relyingParty: PRIVY_MFA_RELYING_PARTY,
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Something went wrong. Please try again.';
      if (message === 'The wallet flow was closed') {
        return;
      }

      setWalletErrorSheetMessage(`Couldn’t start MFA setup.\n\n${message}`);
    }
  }, [initMfaEnrollmentUI]);

  const disableAllMfa = useCallback(async () => {
    const methods = user?.mfa_methods;
    if (!methods?.length) return;
    const types = [...new Set(methods.map((m) => m.type))];
    try {
      for (const method of types) {
        if (method === 'sms') {
          await unenrollMfa({ method: 'sms' });
        } else if (method === 'totp') {
          await unenrollMfa({ method: 'totp' });
        } else if (method === 'passkey') {
          await unenrollMfa({ method: 'passkey' });
        }
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Something went wrong. Please try again.';
      if (message === 'MFA canceled') {
        return;
      }

      setWalletErrorSheetMessage(
        `Couldn’t turn off two-factor authentication.\n\n${message}`
      );
    }
  }, [user?.mfa_methods, unenrollMfa]);

  useEffect(() => {
    if (walletErrorSheetMessage != null) {
      walletErrorSheetRef.current?.present();
    }
  }, [walletErrorSheetMessage]);

  const clearWalletErrorSheet = useCallback(() => {
    setWalletErrorSheetMessage(null);
  }, []);

  const walletAddress = getWalletAddress(
    wallet as { address?: string } | null,
    user ?? null
  )!;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.background,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingBottom: 16,
          zIndex: 10,
        },
        backButton: {
          width: 44,
          height: 44,
          borderRadius: 22,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.border,
        },
        headerTitleWrap: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 8,
        },
        headerSpacer: {
          width: 44,
          height: 44,
        },
        title: {
          fontSize: 28,
          fontWeight: '700',
          color: theme.text,
          textAlign: 'center',
        },
        main: {
          flex: 1,
          paddingHorizontal: 24,
          paddingBottom: 24 + insets.bottom,
        },
        walletColumn: {
          flex: 1,
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
        mfaDescription: {
          fontSize: 14,
          lineHeight: 20,
          color: theme.textSecondary,
          marginBottom: 12,
        },
      }),
    [theme, insets.bottom]
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.8 }]}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.title}>Wallet settings</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>
      <View style={styles.main}>
        <GreenCallout
          stylesBundle={greenCallout}
          icon={
            <Ionicons name="wallet-outline" size={22} color={greenCallout.iconColor} />
          }
        >
          <Text style={greenCallout.styles.text}>
            Privy powers your crypto wallet. Open{' '}
            <Text
              style={greenCallout.styles.link}
              onPress={() => void Linking.openURL(PRIVY_HOME_LOGIN_URL)}
              accessibilityRole="link"
              accessibilityLabel="Privy Home"
              accessibilityHint="Opens Privy Home in your browser"
            >
              Privy Home
            </Text>
            {' '}
            to view balances, fund your wallet, and manage your account.
          </Text>
        </GreenCallout>
        <View style={styles.walletColumn}>
          <SurfaceCard>
            <View style={styles.labelRow}>
              <Text style={styles.cardLabel}>Ethereum address</Text>
              <Pressable
                style={({ pressed }) => [styles.copyButton, pressed && { opacity: 0.8 }]}
                onPress={() => copyOrShare(walletAddress, 'Ethereum address')}
                accessibilityLabel="Copy Ethereum address"
              >
                <Ionicons name="copy-outline" size={20} color={theme.text} />
              </Pressable>
            </View>
            <Text style={styles.cardValue} numberOfLines={1} ellipsizeMode="middle">
              {walletAddress}
            </Text>
          </SurfaceCard>

          <SurfaceCard>
            <Text style={[styles.cardLabel, { marginBottom: 6 }]}>Two-factor authentication</Text>
            <Text style={styles.mfaDescription}>
              Verification when your wallet is used—for example signing
              messages, sending transactions, exporting the wallet, or recovering on a new device.
            </Text>
            <SecondaryButton
              label={mfaEnabled ? 'Disable' : 'Enable'}
              icon={mfaEnabled ? 'shield-outline' : 'shield-checkmark-outline'}
              variant={mfaEnabled ? 'destructive' : 'success'}
              onPress={() =>
                mfaEnabled ? void disableAllMfa() : void startMfaEnrollment()
              }
              accessibilityLabel={
                mfaEnabled
                  ? 'Disable two-factor authentication'
                  : 'Enable two-factor authentication'
              }
            />
          </SurfaceCard>
        </View>
      </View>
      <ErrorBottomSheet
        ref={walletErrorSheetRef}
        error={walletErrorSheetMessage ?? ''}
        onDismiss={clearWalletErrorSheet}
      />
    </View>
  );
}
