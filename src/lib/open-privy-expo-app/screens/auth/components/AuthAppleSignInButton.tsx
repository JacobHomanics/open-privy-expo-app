import { useEffect, useState } from 'react';
import { Platform, Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import {
    AppleAuthenticationButton,
    AppleAuthenticationButtonStyle,
    AppleAuthenticationButtonType,
} from 'expo-apple-authentication';
import type { Theme } from '@open-privy-expo-app/theme/colors';

type ThemeMode = 'light' | 'dark';

type AuthAppleSignInButtonProps = {
    theme: Theme;
    mode: ThemeMode;
    onPress: () => void;
    disabled: boolean;
    rowStyle: ViewStyle;
    rowTextStyle: TextStyle;
    spacingStyle: ViewStyle;
};

export function AuthAppleSignInButton({
    theme,
    mode,
    onPress,
    disabled,
    rowStyle,
    rowTextStyle,
    spacingStyle,
}: AuthAppleSignInButtonProps) {
    const [useNativeAppleButton, setUseNativeAppleButton] = useState(Platform.OS === 'ios');

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
            <View style={spacingStyle}>
                <View
                    style={{ marginHorizontal: 24, opacity: disabled ? 0.85 : 1 }}
                    pointerEvents={disabled ? 'none' : 'auto'}
                >
                    <AppleAuthenticationButton
                        key={mode}
                        buttonType={AppleAuthenticationButtonType.SIGN_IN}
                        buttonStyle={
                            mode === 'dark'
                                ? AppleAuthenticationButtonStyle.WHITE
                                : AppleAuthenticationButtonStyle.BLACK
                        }
                        cornerRadius={10}
                        style={{ width: '100%', height: 44 }}
                        onPress={onPress}
                    />
                </View>
            </View>
        );
    }

    return (
        <Pressable
            style={({ pressed }) => [
                rowStyle,
                spacingStyle,
                (pressed || disabled) && { opacity: 0.85 },
            ]}
            onPress={onPress}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel="Continue with Apple"
        >
            <Ionicons name="logo-apple" size={22} color={theme.text} />
            <Text style={rowTextStyle}>Continue with Apple</Text>
        </Pressable>
    );
}
