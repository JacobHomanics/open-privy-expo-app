import { useQuery } from '@tanstack/react-query';
import { createPublicClient, formatEther, parseAbi, http } from 'viem';
import { BALANCE_CHAINS, type ChainId } from '../../configs/chains';

const ERC20_ABI = parseAbi([
  'function balanceOf(address account) view returns (uint256)',
]);

type ChainBalance = {
  chainId: ChainId;
  chainName: string;
  balance: string;
};

type TokenBalances = {
  total: string;
  byChain: ChainBalance[];
};

/** Numeric aggregates for pricing (not derived from formatted display strings). */
export type WalletBalanceTotals = {
  ethEther: number;
  usdc: number;
};

function formatUsdc(raw: bigint): string {
  const value = Number(raw) / 1e6;
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatEth(raw: string): string {
  const n = parseFloat(raw);
  if (n === 0) return '0';
  if (n < 0.0001) return '<0.0001';
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
}

async function fetchBalances(address: string): Promise<{
  eth: TokenBalances;
  usdc: TokenBalances;
  totals: WalletBalanceTotals;
}> {
  const results = await Promise.allSettled(
    BALANCE_CHAINS.map(async (chain) => {
      const client = createPublicClient({
        chain: {
          id: chain.id,
          name: chain.name,
          nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
          rpcUrls: { default: { http: [chain.rpc] } },
        },
        transport: http(chain.rpc),
      });

      const [ethBalance, usdcBalance] = await Promise.all([
        client.getBalance({ address: address as `0x${string}` }),
        client.readContract({
          address: chain.usdcAddress,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [address as `0x${string}`],
        }),
      ]);

      return {
        chainId: chain.id,
        chainName: chain.name,
        ethWei: ethBalance,
        usdcRaw: usdcBalance,
      };
    })
  );

  const ethByChain: ChainBalance[] = [];
  const usdcByChain: ChainBalance[] = [];
  let totalEthWei = 0n;
  let totalUsdcRaw = 0n;

  results.forEach((result, i) => {
    const chain = BALANCE_CHAINS[i];
    if (result.status === 'fulfilled') {
      const { ethWei, usdcRaw } = result.value;
      totalEthWei += ethWei;
      totalUsdcRaw += usdcRaw;
      ethByChain.push({
        chainId: chain.id,
        chainName: chain.name,
        balance: formatEth(formatEther(ethWei)),
      });
      usdcByChain.push({
        chainId: chain.id,
        chainName: chain.name,
        balance: formatUsdc(usdcRaw),
      });
    } else {
      ethByChain.push({ chainId: chain.id, chainName: chain.name, balance: '0' });
      usdcByChain.push({ chainId: chain.id, chainName: chain.name, balance: '0.00' });
    }
  });

  const sumEthEther = parseFloat(formatEther(totalEthWei));
  const sumUsdc = Number(totalUsdcRaw) / 1e6;

  return {
    eth: {
      total: formatEth(formatEther(totalEthWei)),
      byChain: ethByChain,
    },
    usdc: {
      total: sumUsdc.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      byChain: usdcByChain,
    },
    totals: {
      ethEther: sumEthEther,
      usdc: sumUsdc,
    },
  };
}

export function useWalletBalances(walletAddress: string | null) {
  return useQuery({
    queryKey: ['walletBalances', walletAddress ?? ''],
    queryFn: () => fetchBalances(walletAddress!),
    enabled: !!walletAddress,
    staleTime: 60_000,
  });
}
