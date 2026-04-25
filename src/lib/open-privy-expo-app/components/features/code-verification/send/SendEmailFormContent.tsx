import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";
import SendCodeFormContent from './SendCodeFormContent';
import { SendCodeEmailTextInput } from './SendCodeEmailTextInput';
import ErrorCallout from '@open-privy-expo-app/components/callouts/ErrorCallout';

type SendEmailFormContentProps = {
    email: string;
    onEmailChange: (value: string) => void;
    onSendCode: () => void;
    canContinue: boolean;
    isLoading: boolean;
    message?: string;
    sendError?: string;
    buttonLabel?: string;
    showTitle?: boolean;
};

export default function SendEmailFormContent({
    email,
    onEmailChange,
    onSendCode,
    canContinue,
    isLoading,
    message,
    sendError,
    buttonLabel,
    showTitle = true,
}: SendEmailFormContentProps) {
    const { theme } = useTheme();
    const messageStyle = useMemo(
        () =>
            StyleSheet.create({
                text: {
                    fontSize: 16,
                    color: theme.textSecondary ?? theme.text,
                    textAlign: 'center',
                    marginBottom: 24,
                },
            }),
        [theme]
    );

    return (
        <>
            {message ? <Text style={messageStyle.text}>{message}</Text> : null}
            {sendError ? <ErrorCallout error={sendError} /> : null}
            <SendCodeFormContent
                onSendCode={onSendCode}
                canContinue={canContinue}
                isLoading={isLoading}
                buttonLabel={buttonLabel}
                title={showTitle ? "Email" : undefined}
            >
                <SendCodeEmailTextInput email={email} onEmailChange={onEmailChange} />
            </SendCodeFormContent>
        </>
    );
}
