import type { Address } from 'viem';
import { getErc20TotalSupply } from '@open-privy-expo-app/lib/web3/erc20';
import { useErc20Call, type Erc20CallQueryOptions } from './useErc20Call';

export type Erc20TotalSupplyQueryOptions = Erc20CallQueryOptions<bigint, ['totalSupply', Address]>;

/** ERC-20 `totalSupply()` read (TanStack Query cache). */
export function useErc20TotalSupply(tokenAddress: Address, options?: Erc20TotalSupplyQueryOptions) {
  return useErc20Call(
    ['totalSupply', tokenAddress],
    () => getErc20TotalSupply(tokenAddress),
    options,
  );
}
