import { useMutation } from '@tanstack/react-query';

type Params = {
    value: string | undefined;
    sendCode: (value: string) => Promise<unknown>;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
};

export function useSendCodeMutation({
    value,
    sendCode,
    onSuccess,
    onError,
}: Params) {
    return useMutation({
        mutationFn: async () => {
            await sendCode(value?.trim() ?? '');
        },
        onSuccess: () => onSuccess?.(),
        onError: (err) => { console.error(err); onError?.(err) },
    });
}
