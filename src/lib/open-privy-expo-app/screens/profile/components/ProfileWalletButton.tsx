import { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEmbeddedEthereumWallet, usePrivy } from '@privy-io/expo';
import { SkeletonPulse } from '@open-privy-expo-app/components/skeletons/SkeletonPulse';
import { useWalletBalances } from '@open-privy-expo-app/hooks/web3/useWalletBalances';
import { useEthUsdPrice } from '@open-privy-expo-app/hooks/web3/useEthUsdPrice';
import { useTheme } from "@open-privy-expo-app/theme";
import { getWalletAddress } from '../../../utils/privy';

type ProfileWalletButtonProps = {
  onPress: () => void;
};

export function ProfileWalletButton({ onPress }: ProfileWalletButtonProps) {
  const { theme } = useTheme();
  const { user } = usePrivy();
  const wallet = useEmbeddedEthereumWallet();
  const walletAddress = getWalletAddress(wallet as { address?: string } | null, user ?? null);

  const { data: balanceData, isPending: balancesPending } = useWalletBalances(walletAddress);
  const { data: ethUsd, isPending: ethUsdPending } = useEthUsdPrice(!!walletAddress);

  const showUsdSkeleton =
    !!walletAddress && (balancesPending || !balanceData || ethUsdPending);

  const usdLine = useMemo(() => {
    if (!walletAddress) return null;
    if (balancesPending || !balanceData || ethUsdPending) return null;
    if (ethUsd === undefined) return '—';
    const totalUsd = balanceData.totals.ethEther * ethUsd + balanceData.totals.usdc;
    return totalUsd.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [walletAddress, balanceData, balancesPending, ethUsd, ethUsdPending]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 12,
          backgroundColor: theme.border,
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 10,
          marginBottom: 16,
        },
        content: {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
        title: {
          fontSize: 16,
          fontWeight: '600',
          color: theme.text,
        },
        balance: {
          marginTop: 2,
          fontSize: 13,
          color: theme.textSecondary,
        },
        chevron: {
          marginLeft: 'auto',
        },
        skeleton: {
          borderRadius: 8,
          backgroundColor: theme.background,
          alignSelf: 'flex-start',
        },
        balanceSkeleton: {
          marginTop: 2,
          height: 14,
          width: 120,
        },
      }),
    [theme]
  );

  if (!walletAddress) {
    return null;
  }

  const a11yLabel = showUsdSkeleton
    ? 'Open Wallet, loading balance'
    : usdLine && usdLine !== '—'
      ? `Open Wallet, ${usdLine}`
      : 'Open Wallet';

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
      onPress={onPress}
      accessibilityLabel={a11yLabel}
    >
      <Ionicons name="wallet-outline" size={22} color={theme.text} />
      <View style={styles.content}>
        <Text style={styles.title}>Wallet</Text>
        {showUsdSkeleton ? (
          <SkeletonPulse
            style={[styles.skeleton, styles.balanceSkeleton]}
            accessibilityLabel="Loading wallet value"
          />
        ) : (
          <Text style={styles.balance}>{usdLine ?? '—'}</Text>
        )}
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.textSecondary}
        style={styles.chevron}
      />
    </Pressable>
  );
}
