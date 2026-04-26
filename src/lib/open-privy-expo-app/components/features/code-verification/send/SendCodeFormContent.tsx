import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SendCodeFooter from './SendCodeFooter';
import { useTheme } from '@open-privy-expo-app/theme';

type SendCodeFormContentProps = {
    children: React.ReactNode;
    onSendCode: () => void;
    canContinue: boolean;
    isLoading: boolean;
    /** Footer button label; defaults to "Send Code". */
    buttonLabel?: string;
    title?: string;
};

export default function SendCodeFormContent({
    children,
    onSendCode,
    canContinue,
    isLoading,
    buttonLabel = 'Send Code',
    title
}: SendCodeFormContentProps) {
    const { theme } = useTheme();
    const styles = useMemo(
        () =>
            StyleSheet.create({
                inputSection: {
                    marginHorizontal: 24,
                    marginTop: 24,
                },
                footerContainer: {
                    marginTop: 24,
                },
                titleText: {
                    fontSize: 20,
                    fontWeight: "600",
                    color: theme.text,
                    marginBottom: 16,
                    textAlign: "center",
                },
            }),
        [theme]
    );

    return (
        <>
            {title && <Text style={styles.titleText}>{title}</Text>}
            <View style={styles.inputSection}>{children}</View>
            <View style={styles.footerContainer}>
                <SendCodeFooter
                    label={buttonLabel}
                    onPress={onSendCode}
                    disabled={!canContinue}
                    loading={isLoading}
                />
            </View>
        </>
    );
}
