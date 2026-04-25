import { useMutation } from '@tanstack/react-query';
import { useLoginWithFarcaster } from '@privy-io/expo';

/** SIWF "relying party" = your app’s web origin; must match an allowed domain in Privy. */
function resolveFarcasterRelyingParty(): string {
    const raw = process.env.EXPO_PUBLIC_FARCASTER_RELYING_PARTY?.trim();
    if (!raw) {
        throw new Error(
            'Set EXPO_PUBLIC_FARCASTER_RELYING_PARTY to your app origin (e.g. https://yourapp.com). Add that domain under Allowed domains in the Privy dashboard.'
        );
    }
    try {
        return new URL(raw).origin;
    } catch {
        throw new Error(
            'EXPO_PUBLIC_FARCASTER_RELYING_PARTY must be a valid URL (e.g. https://yourapp.com).'
        );
    }
}

export function useFarcasterLoginMutation({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) {
    const { loginWithFarcaster } = useLoginWithFarcaster();

    return useMutation({
        mutationKey: ['oauth-login', 'farcaster'],
        mutationFn: () =>
            loginWithFarcaster({ relyingParty: resolveFarcasterRelyingParty() }),
        onSuccess: () => onSuccess?.(),
        onError: (err) => {
            console.error(err);
            onError?.(err);
        },
    });
}
