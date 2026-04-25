import type { Address } from "viem";
import { IS_MAINNET } from "@open-privy-expo-app/lib/web3/web3";

export function getContractAddress(addresses: Record<string, Address>): Address {
    return IS_MAINNET
        ? addresses.base
        : addresses.baseSepolia;
}