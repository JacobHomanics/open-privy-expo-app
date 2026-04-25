import { useMemo } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";

export type ResendCodeButtonProps = {
    onPress: () => void;
    disabled: boolean;
    cooldownSeconds: number;
};

export default function ResendCodeButton({
    onPress,
    disabled,
    cooldownSeconds,
}: ResendCodeButtonProps) {
    const { theme } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                resendRow: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 16,
                },
                resendText: {
                    color: theme.primary,
                    fontSize: 14,
                    fontWeight: '500',
                },
                resendTextDisabled: {
                    color: theme.textSecondary ?? theme.text,
                    fontSize: 14,
                    opacity: 0.7,
                },
            }),
        [theme]
    );

    return (
        <View style={styles.resendRow}>
            <Pressable
                onPress={onPress}
                disabled={disabled}
                style={({ pressed }) => pressed && !disabled && { opacity: 0.8 }}
            >
                <Text
                    style={
                        cooldownSeconds > 0
                            ? styles.resendTextDisabled
                            : styles.resendText
                    }
                >
                    {cooldownSeconds > 0
                        ? `Resend code in ${cooldownSeconds}s`
                        : 'Resend code'}
                </Text>
            </Pressable>
        </View>
    );
}
