import { useAuthFlow } from '@open-privy-expo-app/context/AuthFlowContext';
import { usePhoneNumberSendCodeMutation } from '@open-privy-expo-app/hooks/code-verification/send/usePhoneNumberSendCodeMutation';

export function usePhoneNumberMutation({
    phoneNumber,
    onSuccess,
    onError,
}: {
    phoneNumber?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) {
    const { sendSMSCode } = useAuthFlow();

    return usePhoneNumberSendCodeMutation({
        phoneNumber,
        sendCode: (phone) => sendSMSCode({ phone }),
        onSuccess,
        onError,
    });
}
