import type { Address } from 'viem';
import { getErc20Symbol } from '@open-privy-expo-app/lib/web3/erc20';
import { useErc20Call, type Erc20CallQueryOptions } from './useErc20Call';

export type Erc20SymbolQueryOptions = Erc20CallQueryOptions<string, ['symbol', Address]>;

/** ERC-20 `symbol()` read (TanStack Query cache). */
export function useErc20Symbol(tokenAddress: Address, options?: Erc20SymbolQueryOptions) {
  return useErc20Call(
    ['symbol', tokenAddress],
    () => getErc20Symbol(tokenAddress),
    options,
  );
}
