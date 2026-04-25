import { useSendCodeMutation } from './useSendCodeMutation';

type Params = {
    phoneNumber: string | undefined;
    sendCode: (phone: string) => Promise<unknown>;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
};

export function usePhoneNumberSendCodeMutation({
    phoneNumber,
    sendCode,
    onSuccess,
    onError,
}: Params) {
    return useSendCodeMutation({
        value: phoneNumber,
        sendCode,
        onSuccess,
        onError,
    });
}
