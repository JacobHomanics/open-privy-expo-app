import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";

export type DescriptionTextProps = {
    value: string;
};

export default function DescriptionText({ value }: DescriptionTextProps) {
    const { theme } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                message: {
                    fontSize: 16,
                    color: theme.textSecondary ?? theme.text,
                    textAlign: 'center',
                    marginBottom: 24,
                },
                value: {
                    fontWeight: '600',
                    color: theme.primary,
                },
            }),
        [theme]
    );

    return (
        <Text style={styles.message}>
            We sent a code to <Text style={styles.value}>{value}</Text>
        </Text>
    );
}
