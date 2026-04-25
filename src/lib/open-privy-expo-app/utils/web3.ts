const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export function isEthAddress(value: string): value is string {
    return typeof value === 'string' && ETH_ADDRESS_REGEX.test(value);
}