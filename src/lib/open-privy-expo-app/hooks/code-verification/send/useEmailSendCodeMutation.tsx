import { useSendCodeMutation } from './useSendCodeMutation';

type Params = {
    email: string | undefined;
    sendCode: (email: string) => Promise<unknown>;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
};

export function useEmailSendCodeMutation({
    email,
    sendCode,
    onSuccess,
    onError,
}: Params) {
    return useSendCodeMutation({
        value: email,
        sendCode,
        onSuccess,
        onError,
    });
}
