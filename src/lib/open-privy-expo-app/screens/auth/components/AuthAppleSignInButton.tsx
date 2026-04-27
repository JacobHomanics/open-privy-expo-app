import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import {
    AppleAuthenticationButton,
    AppleAuthenticationButtonStyle,
    AppleAuthenticationButtonType,
} from 'expo-apple-authentication';
import { useTheme } from '@open-privy-expo-app/theme';
import { useAnyOAuthLoginPending } from '../hooks/useAnyOAuthLoginPending';
import { useAppleOAuthLoginMutation } from '../hooks/useAppleOAuthLoginMutation';
import { OAuthProviderButton } from './OAuthProviderButton';

type ThemeMode = 'light' | 'dark';

type AuthAppleSignInButtonProps = {
    setFormError: (error: unknown) => void;
    mode: ThemeMode;
};

export function AuthAppleSignInButton({
    setFormError,
    mode,
}: AuthAppleSignInButtonProps) {
    const { theme } = useTheme();
    const [useNativeAppleButton, setUseNativeAppleButton] = useState(Platform.OS === 'ios');
    const oauthBusy = useAnyOAuthLoginPending();
    const mutation = useAppleOAuthLoginMutation({});

    useEffect(() => {
        if (Platform.OS !== 'ios') {
            setUseNativeAppleButton(false);
            return;
        }
        let cancelled = false;
        AppleAuthentication.isAvailableAsync().then((ok) => {
            if (!cancelled) setUseNativeAppleButton(ok);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    if (useNativeAppleButton) {
        return (
            <View>
                <View
                    style={{ marginHorizontal: 24, opacity: oauthBusy ? 0.85 : 1 }}
                    pointerEvents={oauthBusy ? 'none' : 'auto'}
                >
                    <AppleAuthenticationButton

                        key={mode}
                        buttonType={AppleAuthenticationButtonType.CONTINUE}
                        buttonStyle={
                            mode === 'dark'
                                ? AppleAuthenticationButtonStyle.WHITE
                                : AppleAuthenticationButtonStyle.BLACK
                        }
                        cornerRadius={10}
                        style={{ width: '100%', height: 44 }}
                        onPress={() => mutation.mutateAsync().catch((error) => setFormError(error))}
                    />
                </View>
            </View>
        );
    }

    return (
        <OAuthProviderButton
            label="Continue with Apple"
            mutation={mutation}
            onError={(err) => setFormError(err)}
            icon={<Ionicons name="logo-apple" size={22} color={theme.text} />}
        />
    );
}
