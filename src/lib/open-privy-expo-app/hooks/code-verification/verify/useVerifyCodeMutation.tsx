import { useMutation } from '@tanstack/react-query';

type Params = {
    value: string | undefined;
    submitCode: (value: string) => Promise<unknown>;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
};

export function useVerifyCodeMutation({
    value,
    submitCode,
    onSuccess,
    onError,
}: Params) {
    return useMutation({
        mutationFn: async () => {
            await submitCode(value?.trim() ?? '');
        },
        onSuccess: () => onSuccess?.(),
        onError: (err) => { console.error(err); onError?.(err) },
    });
}
