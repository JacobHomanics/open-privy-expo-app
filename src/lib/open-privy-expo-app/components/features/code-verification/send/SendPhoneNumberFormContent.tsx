import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";
import SendCodeFormContent from './SendCodeFormContent';
import PhoneNumberTextInputUSAndCanada from '@open-privy-expo-app/components/text-input/PhoneNumberTextInputUSAndCanada';
import ErrorCallout from '@open-privy-expo-app/components/callouts/ErrorCallout';
import { isValidUSCanadaPhone } from '@open-privy-expo-app/utils/validation';
import { usePhoneNumberMutation } from '@open-privy-expo-app/screens/auth/hooks/usePhoneNumberLoginMutation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useState } from 'react';

type SendPhoneNumberFormContentProps = {
    title?: string;
    message?: string;
    sendError?: string;
    buttonLabel?: string;
};

export default function SendPhoneNumberFormContent({
    title,
    message,
    sendError,
    buttonLabel,
}: SendPhoneNumberFormContentProps) {
    const [phoneNumber, setPhoneNumber] = useState("");

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
    const phoneNumberMutation = usePhoneNumberMutation({
        phoneNumber,
        onSuccess: () =>
            navigation.navigate("VerifyAuthCodePhoneNumber", { value: phoneNumber.trim() }),
        // onError: (error) => setFormError(error),
    });
    return (
        <>
            {message ? <Text style={messageStyle.text}>{message}</Text> : null}
            {sendError ? <ErrorCallout error={sendError} /> : null}
            <SendCodeFormContent
                title={title}
                onSendCode={phoneNumberMutation.mutate}
                canContinue={isValidUSCanadaPhone(phoneNumber)}
                isLoading={phoneNumberMutation.isPending}
                buttonLabel={buttonLabel}
            >
                <PhoneNumberTextInputUSAndCanada
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
            </SendCodeFormContent>
        </>
    );
}
