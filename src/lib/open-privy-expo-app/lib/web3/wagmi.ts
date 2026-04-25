import { createConfig, http } from "wagmi";
import { base, baseSepolia } from "viem/chains";
import { createPublicClient } from "viem";
import { getAlchemyRpcUrl, getAlchemyRpcUrlFromChain } from "./alchemy";
import { CHAIN } from "./web3";

export const wagmiConfig = createConfig({
    chains: [base, baseSepolia],
    // React Native has no browser window APIs (e.g. addEventListener).
    multiInjectedProviderDiscovery: false,
    transports: {
        [base.id]: (() => {
            const url = getAlchemyRpcUrlFromChain(base);
            return url ? http(url) : http();
        })(),
        [baseSepolia.id]: (() => {
            const url = getAlchemyRpcUrlFromChain(baseSepolia);
            return url ? http(url) : http();
        })(),
    },
});

export const getPublicClient = () => {
    const rpcUrl = getAlchemyRpcUrl();
    return createPublicClient({
        chain: CHAIN,
        transport: rpcUrl ? http(rpcUrl) : http(),
    });
};