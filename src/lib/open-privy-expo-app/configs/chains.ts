/**
 * Chains we support for balance display (ETH + USDC).
 * USDC addresses from Circle: https://developers.circle.com/stablecoins/usdc-contract-addresses
 */
export const BALANCE_CHAINS = [
  {
    id: 1,
    name: 'Ethereum',
    rpc: 'https://eth.llamarpc.com',
    usdcAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as const,
  },
  {
    id: 8453,
    name: 'Base',
    rpc: 'https://mainnet.base.org',
    usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const,
  },
  {
    id: 42161,
    name: 'Arbitrum',
    rpc: 'https://arb1.arbitrum.io/rpc',
    usdcAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831' as const,
  },
  {
    id: 137,
    name: 'Polygon',
    rpc: 'https://polygon-rpc.com',
    usdcAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359' as const,
  },
] as const;

export type ChainId = (typeof BALANCE_CHAINS)[number]['id'];
