import { PrivyProvider } from '@privy-io/expo';
import { PrivyElements } from '@privy-io/expo/ui';
import { ReactNode } from 'react';
import { privyConfig, PRIVY_MFA_RELYING_PARTY } from '@open-privy-expo-app/configs/privy';

if (!process.env.EXPO_PUBLIC_PRIVY_APP_ID) {
    throw new Error('Missing EXPO_PUBLIC_PRIVY_APP_ID');
}

if (!process.env.EXPO_PUBLIC_PRIVY_APP_CLIENT_ID) {
    throw new Error('Missing EXPO_PUBLIC_PRIVY_APP_CLIENT_ID');
}

const appId = process.env.EXPO_PUBLIC_PRIVY_APP_ID;
const clientId = process.env.EXPO_PUBLIC_PRIVY_APP_CLIENT_ID;

const privyElementsConfig = PRIVY_MFA_RELYING_PARTY
    ? { mfa: { enableMfaVerificationUIs: true as const } }
    : undefined;

export default function CustomPrivyProvider({ children }: { children: ReactNode }) {
    return (
        <PrivyProvider appId={appId + " 12"} clientId={clientId} config={privyConfig}>
            <PrivyElements config={privyElementsConfig} />
            {children}
        </PrivyProvider>
    );
}
