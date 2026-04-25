import { erc20Abi, type Address } from "viem";
import { getPublicClient } from "./wagmi";

export async function getErc20BalanceOf(
    tokenAddress: Address,
    ownerAddress: Address,
): Promise<bigint> {
    const client = getPublicClient();
    return client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [ownerAddress],
    });
}

export async function getErc20Name(tokenAddress: Address): Promise<string> {
    const client = getPublicClient();
    return client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "name",
    });
}

export async function getErc20Symbol(tokenAddress: Address): Promise<string> {
    const client = getPublicClient();
    return client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "symbol",
    });
}

export async function getErc20Decimals(tokenAddress: Address): Promise<number> {
    const client = getPublicClient();
    return client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
    });
}

export async function getErc20TotalSupply(tokenAddress: Address): Promise<bigint> {
    const client = getPublicClient();
    return client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "totalSupply",
    });
}

export async function getErc20Metadata(tokenAddress: Address): Promise<{
    name: string;
    symbol: string;
    decimals: number;
}> {
    const [name, symbol, decimals] = await Promise.all([
        getErc20Name(tokenAddress),
        getErc20Symbol(tokenAddress),
        getErc20Decimals(tokenAddress),
    ]);

    return { name, symbol, decimals };
}
