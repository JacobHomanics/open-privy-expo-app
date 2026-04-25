import { useMemo } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";

type Props = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
};

export default function PrimaryButton({
    label,
    onPress,
    disabled = false,
    loading = false,
}: Props) {
    const { theme } = useTheme();
    const styles = useMemo(
        () =>
            StyleSheet.create({
                button: {
                    backgroundColor: theme.primary,
                    paddingVertical: 14,
                    paddingHorizontal: 24,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 52,
                },
                buttonDisabled: {
                    opacity: 0.5,
                },
                buttonText: {
                    fontSize: 18,
                    fontWeight: '600',
                    color: theme.primaryContrast,
                },
            }),
        [theme]
    );

    const isDisabled = disabled || loading;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                isDisabled && styles.buttonDisabled,
                pressed && !isDisabled && { opacity: 0.8 },
            ]}
            onPress={onPress}
            disabled={isDisabled}
        >
            <Text style={styles.buttonText}>{label}</Text>
        </Pressable>
    );
}
