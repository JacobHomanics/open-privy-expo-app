import { useMemo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";
import { useAnyOAuthLoginPending } from '../hooks/useAnyOAuthLoginPending';
import { resetRootStackToHome } from '@open-privy-expo-app/navigation/resetRootStackToHome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';

type OAuthLoginMutation = {
    mutateAsync: () => Promise<unknown>;
};

export type OAuthProviderButtonProps = {
    label: string;
    mutation: OAuthLoginMutation;
    onError?: (error: unknown) => void;
    /** Icon shown to the left of the label */
    icon: ReactNode;
    /** When true, adds top margin for stacked buttons below the first */
};

export function OAuthProviderButton({
    label,
    mutation,
    onError,
    icon,
}: OAuthProviderButtonProps) {
    const oauthBusy = useAnyOAuthLoginPending();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Auth'>>();

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
                (pressed || oauthBusy) && { opacity: 0.85 },
            ]}
            onPress={() =>
                mutation
                    .mutateAsync()
                    .then(() => resetRootStackToHome(navigation))
                    .catch((error) => onError?.(error))
            }
            disabled={oauthBusy}
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            {icon}
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}
