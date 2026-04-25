import { useMemo, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppScreenDefaultLayout from '@open-privy-expo-app/components/layouts/AppScreenDefaultLayout';
import OpenPrivyExpoAppHeader from '../../../../../../components/OpenPrivyExpoAppHeader';
import CodeDigitInputs from './CodeDigitInputs';
import DescriptionText from './DescriptionText';
import ResendCodeButton from './ResendCodeButton';
import { useTheme } from "@open-privy-expo-app/theme";
import { useVerifyCodeInput } from '@open-privy-expo-app/hooks/code-verification/verify/useVerifyCodeInput';
import { useVerifyCodeMutation } from '@open-privy-expo-app/hooks/code-verification/verify/useVerifyCodeMutation';
import { useResendCode } from '@open-privy-expo-app/hooks/code-verification/verify/useResendCode';
import LoadingModal from '@open-privy-expo-app/components/modals/LoadingModal';

export type VerifyCodeContentProps = {
    value: string;
    submitCode: (code: string) => Promise<unknown>;
    sendCode: () => Promise<unknown>;
    onSuccess: () => void;
    onBackPress?: () => void;
    /** When set, shows an X button that takes the user all the way back (e.g. to Welcome). */
    onClosePress?: () => void;
    navigation: NativeStackNavigationProp<any>;
};

export default function VerifyCodeContent({
    value,
    submitCode,
    sendCode,
    onSuccess,
    onBackPress,
    onClosePress,
    navigation,
}: VerifyCodeContentProps) {
    const { theme } = useTheme();

    const lastSubmittedCodeRef = useRef('');

    const [formError, setFormError] = useState<unknown>(null);

    const codeInput = useVerifyCodeInput({
        onDigitChange: () => {
            lastSubmittedCodeRef.current = '';
            setFormError(null);
            verifyMutation.reset();
            resendCodeMutation.reset();
        },
    });

    const codeString = codeInput.codeDigits.join('');

    const verifyMutation = useVerifyCodeMutation({
        value: codeString,
        submitCode,
        onSuccess,
        onError: (error: unknown) => setFormError(error),
    });

    const { resendCodeMutation, resendCooldown } = useResendCode({
        sendCode,
        onSuccess: () => verifyMutation.reset(),
    });

    useEffect(() => {
        if (codeString.length !== 6 || verifyMutation.isPending) return;
        if (codeString === lastSubmittedCodeRef.current) return;
        lastSubmittedCodeRef.current = codeString;
        verifyMutation.mutate();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- submit when 6 digits change or pending clears
    }, [codeInput.codeDigits, verifyMutation.isPending]);

    useEffect(() => {
        if (verifyMutation.isError) {
            lastSubmittedCodeRef.current = '';
            codeInput.clearCode();
            codeInput.focusFirst();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to isError flip
    }, [verifyMutation.isError]);

    useEffect(() => {
        codeInput.focusFirst();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount (focusFirst is stable)
    }, [codeInput.focusFirst]);

    const styles = useMemo(
        () =>
            StyleSheet.create({
                loadingBackdrop: {
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                loadingBox: {
                    backgroundColor: theme.background,
                    borderRadius: 16,
                    padding: 32,
                    alignItems: 'center',
                    minWidth: 200,
                    borderWidth: 1,
                    borderColor: theme.border,
                },
                loadingText: {
                    color: theme.text,
                    fontWeight: '700',
                    fontSize: 18,
                    marginTop: 16,
                    textAlign: 'center',
                },
                titleText: {
                    fontSize: 20,
                    fontWeight: '600',
                    color: theme.text,
                    marginBottom: 16,
                    textAlign: 'center',
                },
                errorText: {
                    textAlign: 'center',
                    fontSize: 14,
                    color: '#dc2626',
                    marginTop: 16,
                },
            }),
        [theme]
    );

    return (
        <>
            <AppScreenDefaultLayout
                navigation={navigation}
                header={<OpenPrivyExpoAppHeader />}
                onBackPress={onBackPress}
                onClosePress={onClosePress}
                error={formError}
                onErrorDismiss={() => setFormError(null)}
            >
                <Text style={styles.titleText}>Verification code</Text>
                <DescriptionText value={value} />
                <CodeDigitInputs
                    codeDigits={codeInput.codeDigits}
                    codeInputRefs={codeInput.codeInputRefs}
                    onDigitChange={codeInput.handleCodeDigitChange}
                    onKeyPress={codeInput.handleCodeKeyPress}
                    editable={!verifyMutation.isPending}
                />
                <ResendCodeButton
                    onPress={() => resendCodeMutation.mutate()}
                    disabled={
                        resendCooldown > 0 ||
                        verifyMutation.isPending ||
                        resendCodeMutation.isPending
                    }
                    cooldownSeconds={resendCooldown}
                />
            </AppScreenDefaultLayout>
            <LoadingModal visible={verifyMutation.isPending}>
                {"Verifying code..."}
            </LoadingModal>

        </>
    );
}
