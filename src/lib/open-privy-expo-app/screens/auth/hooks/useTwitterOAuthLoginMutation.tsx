import { useMutation } from '@tanstack/react-query';
import { useAuthFlow } from '@open-privy-expo-app/context/AuthFlowContext';

//NOTE: If issues with login, please do a thorough review of the twitter OAuth login setup on the Privy dashboard.

export function useTwitterOAuthLoginMutation({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) {
    const { loginWithOAuth } = useAuthFlow();

    return useMutation({
        mutationKey: ['oauth-login', 'twitter'],
        mutationFn: () => loginWithOAuth({ provider: 'twitter' }),
        onSuccess: () => onSuccess?.(),
        onError: (err) => {
            console.error(err);
            onError?.(err);
        },
    });
}
