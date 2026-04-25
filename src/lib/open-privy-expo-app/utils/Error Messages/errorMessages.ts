const HUMAN_FRIENDLY_NETWORK_ERROR_MESSAGE =
    'Connection issue. Please ensure you are connected to the internet!';
export const GENERIC_ERROR_MESSAGE = 'Something went wrong. Please try again or contact support.';
export const CONNECTION_TIMEOUT_MESSAGE =
    "Couldn't connect. Please check your connection and try again.";

export const PHONE_ALREADY_LINKED_ERROR_MESSAGE = 'This phone number is already linked to another account. Please try a different one.';
export const EMAIL_ALREADY_LINKED_ERROR_MESSAGE = 'This email is already linked to another account. Please try a different one.';
export const CODE_OR_AUTH_ERROR_MESSAGE = 'Invalid code or authentication error. Please try again.';


export function getErrorMessage(err: unknown): string {
    if (err instanceof Error) return err.message;
    const obj = err as { error?: string; message?: string } | null;
    if (obj?.error && typeof obj.error === 'string') return obj.error;
    if (obj?.message && typeof obj.message === 'string') return obj.message;
    if (err != null) return String(err);
    return '';
}


export const attemptToResolveErrorMessage = (err: string): string => {
    if (isNetworkError(err)) return HUMAN_FRIENDLY_NETWORK_ERROR_MESSAGE;
    if (isEmailAlreadyLinkedError(err)) return EMAIL_ALREADY_LINKED_ERROR_MESSAGE;
    if (isPhoneAlreadyLinkedError(err)) return PHONE_ALREADY_LINKED_ERROR_MESSAGE;
    if (isCodeOrAuthError(err)) return CODE_OR_AUTH_ERROR_MESSAGE;
    return GENERIC_ERROR_MESSAGE;
};

export const isNetworkError = (s: string) => {
    const lower = s.toLowerCase();
    return lower.includes('network request failed') || lower.includes('network error') || lower.includes("aborterror: aborted");
};

export const isEmailAlreadyLinkedError = (s: string) => {
    return /already linked.*email/i.test(s);
};

export const isPhoneAlreadyLinkedError = (s: string) => {
    return /already linked.*phone/i.test(s);
};

export function isCodeOrAuthError(message: string): boolean {
    return (
        /invalid\s*(email|phone|code)/i.test(message) ||
        /invalid.*credentials/i.test(message) ||
        /incorrect\s*code|wrong\s*code/i.test(message)
    );
}