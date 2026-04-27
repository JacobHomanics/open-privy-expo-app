import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '@open-privy-expo-app/navigation/SettingsStack';
import { useMemo, useState } from 'react';
import AppScreenDefaultLayout from '@open-privy-expo-app/components/layouts/AppScreenDefaultLayout';
import DefaultAppHeader from '@open-privy-expo-app/defaults/DefaultAppHeader';
import SendPhoneNumberFormContent from '@open-privy-expo-app/components/features/code-verification/send/SendPhoneNumberFormContent';
import { isValidUSCanadaPhone } from '../../../../../utils/validation';
import { useLinkCodePhoneNumberMutation } from './hooks/useLinkCodePhoneNumberMutation';
import { UseMutationResult } from '@tanstack/react-query';
import { useTheme } from "@open-privy-expo-app/theme";
import { StyleSheet, Text } from 'react-native';

type Props = NativeStackScreenProps<SettingsStackParamList, 'LinkAccountPhoneNumber'>;

export default function LinkAccountPhoneNumberScreen({ navigation }: Props) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formError, setFormError] = useState<unknown>(null);

    const phoneNumberMutation = useLinkCodePhoneNumberMutation({
        phoneNumber,
        onSuccess: () => navigation.navigate('VerifyLinkAccountCode', { type: 'phone', value: phoneNumber.trim() }),
        onError: (error) => setFormError(error),
    });

    return (
        <AppScreenDefaultLayout
            navigation={navigation}
            header={<DefaultAppHeader />}
            onBackPress={() => navigation.goBack()}
            stretchContent
            error={formError}
            onErrorDismiss={() => setFormError(null)}
        >
            <LinkAccountPhoneNumberFormContent
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                phoneNumberMutation={phoneNumberMutation}
            />
        </AppScreenDefaultLayout>
    );
}


type LinkAccountPhoneNumberFormContentProps = {
    phoneNumber: string;
    setPhoneNumber: (phoneNumber: string) => void;
    phoneNumberMutation: UseMutationResult<void, Error, void>;
};

export function LinkAccountPhoneNumberFormContent({ phoneNumber, setPhoneNumber, phoneNumberMutation }: LinkAccountPhoneNumberFormContentProps) {
    const { theme } = useTheme();
    const styles = useMemo(
        () =>
            StyleSheet.create({
                titleText: {
                    fontSize: 20,
                    fontWeight: '600',
                    color: theme.text,
                    marginBottom: 16,
                    textAlign: 'center',
                },
            }),
        [theme]
    );
    return (
        <>
            <Text style={styles.titleText}>Link phone number</Text>
            <SendPhoneNumberFormContent
                phoneNumber={phoneNumber}
                onPhoneNumberChange={setPhoneNumber}
                onSendCode={() => phoneNumberMutation.mutate()}
                canContinue={isValidUSCanadaPhone(phoneNumber)}
                isLoading={phoneNumberMutation.isPending}
            />
        </>
    );
}