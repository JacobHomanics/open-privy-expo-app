import { useIsMutating } from '@tanstack/react-query';

/** True while any oauth-login mutation (Google, X, Farcaster) is in flight. */
export function useAnyOAuthLoginPending(): boolean {
    return (
        useIsMutating({
            predicate: (mutation) => {
                const key = mutation.options.mutationKey;
                return Array.isArray(key) && key[0] === 'oauth-login';
            },
        }) > 0
    );
}
