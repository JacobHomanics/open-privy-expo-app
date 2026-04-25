import { base, baseSepolia } from 'viem/chains';

export const IS_MAINNET = process.env.EXPO_PUBLIC_IS_MAINNET === 'true';
export const CHAIN = IS_MAINNET ? base : baseSepolia;

