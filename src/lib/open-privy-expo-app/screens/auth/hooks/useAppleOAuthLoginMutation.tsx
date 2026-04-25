import { useMutation } from '@tanstack/react-query';
import { useAuthFlow } from '@open-privy-expo-app/context/AuthFlowContext';

export function useAppleOAuthLoginMutation({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) {
    const { loginWithOAuth } = useAuthFlow();

    return useMutation({
        mutationFn: () => loginWithOAuth({ provider: 'apple' }),
        onSuccess: () => onSuccess?.(),
        onError: (err) => {
            console.error(err);
            onError?.(err);
        },
    });
}
