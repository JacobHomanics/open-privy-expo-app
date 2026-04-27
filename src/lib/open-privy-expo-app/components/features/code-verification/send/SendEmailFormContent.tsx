import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";
import SendCodeFormContent from './SendCodeFormContent';
import { SendCodeEmailTextInput } from './SendCodeEmailTextInput';
import ErrorCallout from '@open-privy-expo-app/components/callouts/ErrorCallout';
import { isValidEmail } from '@open-privy-expo-app/utils/validation';
import { useEmailLoginCodeMutation } from '@open-privy-expo-app/screens/auth/hooks/useEmailLoginCodeMutation';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';

type SendEmailFormContentProps = {
    message?: string;
    onError?: (error: unknown) => void;
    buttonLabel?: string;
    title?: string;
};

export default function SendEmailFormContent({
    message,
    onError,
    buttonLabel,
    title,
}: SendEmailFormContentProps) {
    const [email, setEmail] = useState("");

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

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const emailMutation = useEmailLoginCodeMutation({
        email,
        onSuccess: () =>
            navigation.navigate("VerifyAuthCodeEmail", { value: email.trim() }),
        onError: (error) => onError?.(error),
    });

    return (
        <>
            {message ? <Text style={messageStyle.text}>{message}</Text> : null}
            {/* {sendError ? <ErrorCallout error={sendError} /> : null} */}
            <SendCodeFormContent
                onSendCode={emailMutation.mutate}
                canContinue={isValidEmail(email)}
                isLoading={emailMutation.isPending}
                buttonLabel={buttonLabel}
                title={title}
            >
                <SendCodeEmailTextInput email={email} onEmailChange={setEmail} />
            </SendCodeFormContent>
        </>
    );
}
