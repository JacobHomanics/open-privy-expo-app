import { useAuthFlow } from '@open-privy-expo-app/context/AuthFlowContext';
import { useEmailSendCodeMutation } from '@open-privy-expo-app/hooks/code-verification/send/useEmailSendCodeMutation';

export function useEmailLoginCodeMutation({
    email,
    onSuccess,
    onError,
}: {
    email?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) {
    const { sendEmailCode } = useAuthFlow();

    return useEmailSendCodeMutation({
        email,
        sendCode: (email) => sendEmailCode({ email }),
        onSuccess,
        onError,
    });
}
