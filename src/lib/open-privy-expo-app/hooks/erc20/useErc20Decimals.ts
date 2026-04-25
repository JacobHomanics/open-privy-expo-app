import type { Address } from 'viem';
import { getErc20Decimals } from '@open-privy-expo-app/lib/web3/erc20';
import { useErc20Call, type Erc20CallQueryOptions } from './useErc20Call';

export type Erc20DecimalsQueryOptions = Erc20CallQueryOptions<number, ['decimals', Address]>;

/** ERC-20 `decimals()` read (TanStack Query cache). */
export function useErc20Decimals(tokenAddress: Address, options?: Erc20DecimalsQueryOptions) {
  return useErc20Call(
    ['decimals', tokenAddress],
    () => getErc20Decimals(tokenAddress),
    options,
  );
}
