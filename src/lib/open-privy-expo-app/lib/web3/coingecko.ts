const COINGECKO_ETHEREUM_USD_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

type CoinGeckoSimplePriceResponse = {
  ethereum?: { usd?: number };
};

export async function fetchEthUsd(): Promise<number> {
  const res = await fetch(COINGECKO_ETHEREUM_USD_URL);
  if (!res.ok) {
    throw new Error(`ETH/USD request failed: ${res.status}`);
  }
  const json = (await res.json()) as CoinGeckoSimplePriceResponse;
  const usd = json.ethereum?.usd;
  if (typeof usd !== 'number' || !Number.isFinite(usd)) {
    throw new Error('Invalid ETH/USD response');
  }
  return usd;
}
