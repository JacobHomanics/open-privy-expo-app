import type { Address } from 'viem';
import { getErc20Name } from '@open-privy-expo-app/lib/web3/erc20';
import { useErc20Call, type Erc20CallQueryOptions } from './useErc20Call';

export type Erc20NameQueryOptions = Erc20CallQueryOptions<string, ['name', Address]>;

/** ERC-20 `name()` read (TanStack Query cache). */
export function useErc20Name(tokenAddress: Address, options?: Erc20NameQueryOptions) {
  return useErc20Call(
    ['name', tokenAddress],
    () => getErc20Name(tokenAddress),
    options,
  );
}
