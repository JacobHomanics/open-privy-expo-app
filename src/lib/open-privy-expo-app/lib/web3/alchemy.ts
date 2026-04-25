import { base, baseSepolia, Chain } from "viem/chains";
import { CHAIN } from "./web3";

export const alchemyApiKey = process.env.EXPO_PUBLIC_ALCHEMY_API_KEY;
if (!alchemyApiKey) {
    throw new Error("ALCHEMY_API_KEY must be set in environment variables");
}

const alchemyChainMapping = {
    [baseSepolia.id]: "base-sepolia",
    [base.id]: "base-mainnet",
};

export function getAlchemyRpcUrlBase(apiKey: string, chainId: number): string {
    const network = alchemyChainMapping[chainId as keyof typeof alchemyChainMapping];
    if (!network) {
        throw new Error(`Unsupported chain: ${chainId}`);
    }
    return `https://${network}.g.alchemy.com/v2/${apiKey}`;
}

export function getAlchemyRpcUrlFromChainId(chainId: number): string {
    return getAlchemyRpcUrlBase(alchemyApiKey || "", chainId);
}

export function getAlchemyRpcUrlFromChain(chain: Chain): string {
    return getAlchemyRpcUrlFromChainId(chain.id);
}

export function getAlchemyRpcUrl(): string {
    return getAlchemyRpcUrlFromChainId(CHAIN.id);
}