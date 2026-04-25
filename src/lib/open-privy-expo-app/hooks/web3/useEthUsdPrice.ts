import { useQuery } from '@tanstack/react-query';
import { fetchEthUsd } from '@open-privy-expo-app/lib/web3/coingecko';

export function useEthUsdPrice(enabled = true) {
  return useQuery({
    queryKey: ['ethUsdPrice'],
    queryFn: fetchEthUsd,
    enabled,
    staleTime: 60_000,
    retry: 2,
  });
}
