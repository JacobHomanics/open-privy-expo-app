import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

/** Root segment for all ERC-20 TanStack Query keys from this module. */
export const ERC20_QUERY_KEY = 'erc20' as const;

export type Erc20CallQueryOptions<TData, TSuffix extends readonly unknown[]> = Omit<
  UseQueryOptions<TData, Error, TData, readonly ['erc20', ...TSuffix]>,
  'queryKey' | 'queryFn'
>;

/**
 * TanStack Query wrapper for ERC-20 reads. Pass everything after `'erc20'` — e.g.
 * `['name', tokenAddress]` becomes `['erc20', 'name', tokenAddress]`.
 */
export function useErc20Call<TData, const TSuffix extends readonly unknown[]>(
  queryKeySuffix: TSuffix,
  queryFn: () => Promise<TData>,
  options?: Erc20CallQueryOptions<TData, TSuffix>,
) {
  return useQuery({
    ...options,
    queryKey: [ERC20_QUERY_KEY, ...queryKeySuffix],
    queryFn,
  });
}
