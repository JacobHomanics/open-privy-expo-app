import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePrivy, useEmbeddedEthereumWallet } from '@privy-io/expo';
import { useFundWallet } from '@privy-io/expo/ui';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { BALANCE_CHAINS } from '../../../../configs/chains';
import { useTheme } from "@open-privy-expo-app/theme";
import { getWalletAddress } from '../../../../utils/privy';
import { copyOrShare } from '@open-privy-expo-app/utils/utils';
import { useWalletBalances } from '@open-privy-expo-app/hooks/web3/useWalletBalances';
import SecondaryButton from '@open-privy-expo-app/components/buttons/SecondaryButton';
import SurfaceCard from '@open-privy-expo-app/components/cards/SurfaceCard';
import { SkeletonPulse } from '@open-privy-expo-app/components/skeletons/SkeletonPulse';

type Props = NativeStackScreenProps<RootStackParamList, 'Wallet'>;

export default function WalletScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { user } = usePrivy();
  const wallet = useEmbeddedEthereumWallet();
  const { fundWallet } = useFundWallet();
  const walletAddress = getWalletAddress(
    wallet as { address?: string } | null,
    user ?? null
  );

  const { data: balances, isPending: balancesPending } = useWalletBalances(walletAddress);
  const [expandedEth, setExpandedEth] = useState(false);
  const [expandedUsdc, setExpandedUsdc] = useState(false);

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
        },
        mainWithActions: {
          paddingBottom: 120 + insets.bottom,
        },
        mainDefault: {
          paddingBottom: 24 + insets.bottom,
        },
        actionsDock: {
          position: 'absolute',
          left: 24,
          right: 24,
        },
        actionRow: {
          flexDirection: 'row',
          gap: 12,
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
        balanceRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 12,
          paddingHorizontal: 0,
          minHeight: 48,
        },
        balanceRowTouchable: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
        },
        balanceTokenLabel: {
          fontSize: 16,
          fontWeight: '600',
          color: theme.text,
        },
        balanceTotal: {
          fontSize: 16,
          fontWeight: '600',
          color: theme.text,
        },
        balanceChainRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
          paddingLeft: 16,
          paddingRight: 0,
          minHeight: 40,
          borderTopWidth: 1,
          borderTopColor: theme.background,
        },
        balanceChainName: {
          fontSize: 14,
          color: theme.textSecondary,
        },
        balanceChainValue: {
          fontSize: 14,
          color: theme.text,
          fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        },
        skeletonRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 12,
          minHeight: 48,
        },
        skeletonRightGroup: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        skeletonValue: {
          height: 16,
          width: 94,
          borderRadius: 8,
          backgroundColor: theme.background,
        },
        skeletonChevron: {
          height: 16,
          width: 16,
          borderRadius: 8,
          backgroundColor: theme.background,
        },
        emptyText: {
          fontSize: 15,
          color: theme.textSecondary,
          textAlign: 'center',
          marginTop: 24,
        },
      }),
    [theme, insets.bottom]
  );

  const ethChainRows =
    balances?.eth?.byChain?.length && balances.eth.byChain.length > 0
      ? balances.eth.byChain
      : BALANCE_CHAINS.map((c) => ({
          chainId: c.id,
          chainName: c.name,
          balance: '0',
        }));

  const usdcChainRows =
    balances?.usdc?.byChain?.length && balances.usdc.byChain.length > 0
      ? balances.usdc.byChain
      : BALANCE_CHAINS.map((c) => ({
          chainId: c.id,
          chainName: c.name,
          balance: '0.00',
        }));

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
          <Text style={styles.title}>Wallet</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>
      <View
        style={[
          styles.main,
          walletAddress ? styles.mainWithActions : styles.mainDefault,
        ]}
      >
        {!walletAddress ? (
          <Text style={styles.emptyText}>No wallet address is available for this account.</Text>
        ) : (
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
              <Text style={[styles.cardLabel, { marginBottom: 8 }]}>Balances</Text>
              {balancesPending ? (
                <View>
                  <View style={styles.skeletonRow}>
                    <Text style={styles.balanceTokenLabel}>ETH</Text>
                    <View style={styles.skeletonRightGroup}>
                      <SkeletonPulse style={styles.skeletonValue} accessibilityLabel="Loading ETH balance" />
                      <SkeletonPulse style={styles.skeletonChevron} />
                    </View>
                  </View>
                  <View style={styles.skeletonRow}>
                    <Text style={styles.balanceTokenLabel}>USDC</Text>
                    <View style={styles.skeletonRightGroup}>
                      <SkeletonPulse style={styles.skeletonValue} accessibilityLabel="Loading USDC balance" />
                      <SkeletonPulse style={styles.skeletonChevron} />
                    </View>
                  </View>
                </View>
              ) : (
                <>
                  <Pressable
                    style={({ pressed }) => [styles.balanceRow, pressed && { opacity: 0.7 }]}
                    onPress={() => setExpandedEth((e) => !e)}
                    accessibilityRole="button"
                    accessibilityLabel="ETH balance"
                    accessibilityState={{ expanded: expandedEth }}
                    accessibilityHint="Shows or hides ETH amount per network"
                  >
                    <View style={styles.balanceRowTouchable}>
                      <Text style={styles.balanceTokenLabel}>ETH</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={styles.balanceTotal}>
                          {(balances?.eth?.total ?? '0')} ETH
                        </Text>
                        <Ionicons
                          name={expandedEth ? 'chevron-up' : 'chevron-down'}
                          size={20}
                          color={theme.textSecondary}
                        />
                      </View>
                    </View>
                  </Pressable>
                  {expandedEth
                    ? ethChainRows.map((c) => (
                        <View key={c.chainId} style={styles.balanceChainRow}>
                          <Text style={styles.balanceChainName}>{c.chainName}</Text>
                          <Text style={styles.balanceChainValue}>{c.balance} ETH</Text>
                        </View>
                      ))
                    : null}
                  <Pressable
                    style={({ pressed }) => [styles.balanceRow, pressed && { opacity: 0.7 }]}
                    onPress={() => setExpandedUsdc((e) => !e)}
                    accessibilityRole="button"
                    accessibilityLabel="USDC balance"
                    accessibilityState={{ expanded: expandedUsdc }}
                    accessibilityHint="Shows or hides USDC amount per network"
                  >
                    <View style={styles.balanceRowTouchable}>
                      <Text style={styles.balanceTokenLabel}>USDC</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={styles.balanceTotal}>
                          ${balances?.usdc?.total ?? '0.00'} USDC
                        </Text>
                        <Ionicons
                          name={expandedUsdc ? 'chevron-up' : 'chevron-down'}
                          size={20}
                          color={theme.textSecondary}
                        />
                      </View>
                    </View>
                  </Pressable>
                  {expandedUsdc
                    ? usdcChainRows.map((c) => (
                        <View key={c.chainId} style={styles.balanceChainRow}>
                          <Text style={styles.balanceChainName}>{c.chainName}</Text>
                          <Text style={styles.balanceChainValue}>{c.balance} USDC</Text>
                        </View>
                      ))
                    : null}
                </>
              )}
            </SurfaceCard>
          </View>
        )}
      </View>
      {walletAddress ? (
        <View style={[styles.actionsDock, { bottom: insets.bottom + 24 }]}>
          <View style={styles.actionRow}>
            <SecondaryButton
              label="Send"
              icon="arrow-up-circle-outline"
              onPress={() => Alert.alert('To be implemented')}
              accessibilityLabel="Send"
              style={{ flex: 1 }}
            />
            <SecondaryButton
              label="Deposit"
              icon="add-circle-outline"
              onPress={() => fundWallet({ address: walletAddress })}
              accessibilityLabel="Deposit"
              style={{ flex: 1 }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}
