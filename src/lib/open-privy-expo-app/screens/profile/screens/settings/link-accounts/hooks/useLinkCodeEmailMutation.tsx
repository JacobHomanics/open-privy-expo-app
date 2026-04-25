import { useLinkEmail } from '@privy-io/expo';
import { useEmailSendCodeMutation } from '@open-privy-expo-app/hooks/code-verification/send/useEmailSendCodeMutation';

export function useLinkCodeEmailMutation({
    email,
    onSuccess,
    onError,
}: {
    email?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) {
    const linkEmail = useLinkEmail();

    return useEmailSendCodeMutation({
        email,
        sendCode: (email) => linkEmail.sendCode({ email }),
        onSuccess,
        onError,
    });
}
