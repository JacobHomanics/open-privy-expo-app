import { useMutation } from '@tanstack/react-query';
import { useAuthFlow } from '@open-privy-expo-app/context/AuthFlowContext';

export function useGoogleOAuthLoginMutation({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) {
    const { loginWithOAuth } = useAuthFlow();

    return useMutation({
        mutationKey: ['oauth-login', 'google'],
        mutationFn: () => loginWithOAuth({ provider: 'google' }),
        onSuccess: () => onSuccess?.(),
        onError: (err) => {
            console.error(err);
            onError?.(err);
        },
    });
}
