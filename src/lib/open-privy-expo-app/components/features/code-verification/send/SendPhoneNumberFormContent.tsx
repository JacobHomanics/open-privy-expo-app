import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";
import SendCodeFormContent from './SendCodeFormContent';
import PhoneNumberTextInputUSAndCanada from '@open-privy-expo-app/components/text-input/PhoneNumberTextInputUSAndCanada';
import ErrorCallout from '@open-privy-expo-app/components/callouts/ErrorCallout';

type SendPhoneNumberFormContentProps = {
    phoneNumber: string;
    onPhoneNumberChange: (value: string) => void;
    onSendCode: () => void;
    canContinue: boolean;
    isLoading: boolean;
    title?: string;
    message?: string;
    sendError?: string;
    buttonLabel?: string;
};

export default function SendPhoneNumberFormContent({
    phoneNumber,
    onPhoneNumberChange,
    onSendCode,
    canContinue,
    isLoading,
    title,
    message,
    sendError,
    buttonLabel,
}: SendPhoneNumberFormContentProps) {
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
                title={title}
                onSendCode={onSendCode}
                canContinue={canContinue}
                isLoading={isLoading}
                buttonLabel={buttonLabel}
            >
                <PhoneNumberTextInputUSAndCanada
                    value={phoneNumber}
                    onChangeText={onPhoneNumberChange}
                />
            </SendCodeFormContent>
        </>
    );
}
