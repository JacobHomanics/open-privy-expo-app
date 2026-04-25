import { useLinkSMS } from '@privy-io/expo';
import { usePhoneNumberSendCodeMutation } from '@open-privy-expo-app/hooks/code-verification/send/usePhoneNumberSendCodeMutation';

export function useLinkCodePhoneNumberMutation({
    phoneNumber,
    onSuccess,
    onError,
}: {
    phoneNumber?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) {
    const linkSMS = useLinkSMS();

    return usePhoneNumberSendCodeMutation({
        phoneNumber,
        sendCode: (phone) => linkSMS.sendCode({ phone }),
        onSuccess,
        onError,
    });
}
