import { useState, useCallback } from 'react';
import SendEmailFormContent from './SendEmailFormContent';
import SendPhoneNumberFormContent from './SendPhoneNumberFormContent';
import { SEND_CODE_ERROR_MESSAGE } from '@open-privy-expo-app/constants/auth';

export type SendCodeFormConfig = {
    validate: (value: string) => boolean;
    message?: string;
};

export type SendCodeFormProps = {
    type: 'email' | 'phone';
    config: SendCodeFormConfig;
    value: string;
    onChangeValue: (value: string) => void;
    sendCode: () => Promise<void>;
    isSending: boolean;
    onSuccess: (value: string) => void;
    buttonText?: string;
};

/**
 * Shared form for sending a verification code (email or phone).
 * Owns sendError state; caller owns value and provides sendCode + onSuccess.
 */
export default function SendCodeForm({
    type,
    config,
    value,
    onChangeValue,
    sendCode,
    isSending,
    onSuccess,
    buttonText = 'Send Code',
}: SendCodeFormProps) {
    const [sendError, setSendError] = useState('');
    const canSend = config.validate(value);

    const handleSendCode = useCallback(async () => {
        if (!canSend) return;
        setSendError('');
        try {
            await sendCode();
            onSuccess(value.trim());
        } catch {
            setSendError(SEND_CODE_ERROR_MESSAGE);
        }
    }, [canSend, sendCode, onSuccess, value]);

    const shared = {
        onSendCode: handleSendCode,
        canContinue: canSend,
        isLoading: isSending,
        message: config.message,
        sendError: sendError || undefined,
        buttonLabel: buttonText,
    };

    return type === 'email' ? (
        <SendEmailFormContent
            email={value}
            onEmailChange={onChangeValue}
            {...shared}
        />
    ) : (
        <SendPhoneNumberFormContent
            phoneNumber={value}
            onPhoneNumberChange={onChangeValue}
            {...shared}
        />
    );
}

export type EmailFormConfig = SendCodeFormConfig;
export type EmailFormProps = Omit<SendCodeFormProps, 'type'>;

export function EmailForm(props: EmailFormProps) {
    return <SendCodeForm type="email" {...props} />;
}

export type PhoneFormConfig = SendCodeFormConfig;
export type PhoneFormProps = Omit<SendCodeFormProps, 'type'>;

export function PhoneForm(props: PhoneFormProps) {
    return <SendCodeForm type="phone" {...props} />;
}
