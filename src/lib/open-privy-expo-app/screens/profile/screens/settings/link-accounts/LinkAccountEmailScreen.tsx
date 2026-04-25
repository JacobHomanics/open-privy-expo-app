import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '@open-privy-expo-app/navigation/SettingsStack';
import { useMemo, useState } from 'react';
import AppScreenDefaultLayout from '@open-privy-expo-app/components/layouts/AppScreenDefaultLayout';
import OpenPrivyExpoAppHeader from '../../../../../../../components/OpenPrivyExpoAppHeader';
import SendEmailFormContent from '@open-privy-expo-app/components/features/code-verification/send/SendEmailFormContent';
import { isValidEmail } from '../../../../../utils/validation';
import { useLinkCodeEmailMutation } from './hooks/useLinkCodeEmailMutation';
import { UseMutationResult } from '@tanstack/react-query';
import { useTheme } from "@open-privy-expo-app/theme";
import { StyleSheet, Text } from 'react-native';

type Props = NativeStackScreenProps<SettingsStackParamList, 'LinkAccountEmail'>;

export default function LinkAccountEmailScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [formError, setFormError] = useState<unknown>(null);

    const emailMutation = useLinkCodeEmailMutation({
        email,
        onSuccess: () => navigation.navigate('VerifyLinkAccountCode', { type: 'email', value: email.trim() }),
        onError: (error) => setFormError(error),
    });

    return (
        <AppScreenDefaultLayout
            navigation={navigation}
            header={<OpenPrivyExpoAppHeader />}
            onBackPress={() => navigation.goBack()}
            stretchContent
            error={formError}
            onErrorDismiss={() => setFormError(null)}
        >
            <LinkAccountEmailFormContent
                email={email}
                setEmail={setEmail}
                emailMutation={emailMutation}
            />
        </AppScreenDefaultLayout>
    );
}

type LinkAccountEmailFormContentProps = {
    email: string;
    setEmail: (email: string) => void;
    emailMutation: UseMutationResult<void, Error, void>;
};

export function LinkAccountEmailFormContent({ email, setEmail, emailMutation }: LinkAccountEmailFormContentProps) {
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
            <Text style={styles.titleText}>Link email</Text>
            <SendEmailFormContent
                email={email}
                onEmailChange={setEmail}
                onSendCode={() => emailMutation.mutate()}
                canContinue={isValidEmail(email)}
                isLoading={emailMutation.isPending}
            />
        </>

    );
}