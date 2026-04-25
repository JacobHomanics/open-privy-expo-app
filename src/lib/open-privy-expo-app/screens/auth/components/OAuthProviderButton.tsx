import { useMemo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";

export type OAuthProviderButtonProps = {
    label: string;
    onPress: () => void;
    disabled: boolean;
    /** Icon shown to the left of the label */
    icon: ReactNode;
    /** When true, adds top margin for stacked buttons below the first */
    stacked?: boolean;
};

export function OAuthProviderButton({
    label,
    onPress,
    disabled,
    icon,
    stacked,
}: OAuthProviderButtonProps) {
    const { theme } = useTheme();
    const styles = useMemo(
        () =>
            StyleSheet.create({
                button: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    marginHorizontal: 24,
                    paddingVertical: 14,
                    borderRadius: 10,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: theme.border,
                    backgroundColor: theme.background,
                },
                stacked: {
                    marginTop: 12,
                },
                label: {
                    fontSize: 16,
                    fontWeight: '600',
                    color: theme.text,
                },
            }),
        [theme]
    );

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                stacked && styles.stacked,
                (pressed || disabled) && { opacity: 0.85 },
            ]}
            onPress={onPress}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            {icon}
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}
