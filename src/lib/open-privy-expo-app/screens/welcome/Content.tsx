import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";
import { Text } from 'react-native';
import LoginButton from '@open-privy-expo-app/components/app-buttons/login/LoginButton';
import { config } from '@open-privy-expo-app/configs/screens/WelcomeScreen.config';

export default function Content() {
    const { theme } = useTheme();

    const styles = useMemo(() => StyleSheet.create({
        content: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        welcomeText: {
            fontSize: 18,
            fontWeight: '600',
            color: theme.text,
            textAlign: 'center',
            marginBottom: 16,
        },
        welcomeTextSecondary: {
            fontSize: 18,
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 8,
            maxWidth: 280,
            alignSelf: 'center',
        },
    }), [theme]);

    const defaultContent = {
        top: config?.content?.customBodyTopContent ?? <Text style={styles.welcomeText}>Welcome to the app</Text>,
        loginButton: config?.content?.loginButton?.customContent ?? <LoginButton customText={config?.content?.loginButton?.customText} customIcon={config?.content?.loginButton?.customIcon} />,
        bottom: config?.content?.customBodyBottomContent ?? <Text style={styles.welcomeTextSecondary}>Use this app to create a next gen Privy enabled app!</Text>
    }

    return (
        <View style={styles.content}>
            {defaultContent.top}
            {defaultContent.loginButton}
            {defaultContent.bottom}
        </View>
    );
}

