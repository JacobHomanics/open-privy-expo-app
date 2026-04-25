import type { Address } from 'viem';
import { getErc20BalanceOf } from '@open-privy-expo-app/lib/web3/erc20';
import { useErc20Call, type Erc20CallQueryOptions } from './useErc20Call';

export type Erc20BalanceOfQueryOptions = Erc20CallQueryOptions<
  bigint,
  ['balanceOf', Address, Address]
>;

/** ERC-20 `balanceOf(address)` read (TanStack Query cache). */
export function useErc20BalanceOf(
  tokenAddress: Address,
  ownerAddress: Address,
  options?: Erc20BalanceOfQueryOptions,
) {
  return useErc20Call(
    ['balanceOf', tokenAddress, ownerAddress],
    () => getErc20BalanceOf(tokenAddress, ownerAddress),
    options,
  );
}
