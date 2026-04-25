import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

const COOLDOWN_SECONDS = 60;

export type UseResendCodeParams = {
    /** Invoked when user taps resend. Caller is responsible for sending to the correct email/phone. */
    sendCode: () => Promise<unknown>;
    onSuccess: () => void;
};

export function useResendCode({
    sendCode,
    onSuccess,
}: UseResendCodeParams) {
    const [resendCooldown, setResendCooldown] = useState(0);
    const resendCodeMutation = useMutation({
        mutationFn: () => sendCode(),
        onSuccess: () => {
            setResendCooldown(COOLDOWN_SECONDS);
            onSuccess();
        },
        onError: (err: unknown) => console.error('Error resending code:', err),
    });
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const id = setInterval(() => setResendCooldown((c) => (c <= 1 ? 0 : c - 1)), 1000);
        return () => clearInterval(id);
    }, [resendCooldown]);

    return { resendCodeMutation, resendCooldown };
};
