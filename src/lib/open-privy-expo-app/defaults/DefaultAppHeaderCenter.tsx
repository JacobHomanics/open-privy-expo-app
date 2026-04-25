import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@open-privy-expo-app/theme';
import DefaultAppLogo from './logos/DefaultAppLogo';
import { appConfig } from '../configs/app';

export default function DefaultAppHeaderCenter() {
    const { theme } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    alignItems: 'center',
                    paddingTop: 16,
                },
                titleText: {
                    fontSize: 20,
                    fontWeight: '600',
                    color: theme.text,
                },
            }),
        [theme]
    );

    return (
        <View style={styles.container}>
            <DefaultAppLogo />
            <Text style={styles.titleText}>
                {appConfig.name}
            </Text>
        </View>
    );
}
