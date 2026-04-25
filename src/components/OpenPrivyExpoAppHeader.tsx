import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@open-privy-expo-app/theme';
import OpenPrivyExpoAppLogo from './logos/OpenPrivyExpoAppLogo';

export default function OpenPrivyExpoAppHeader() {
    const { theme } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    alignItems: 'center',
                    paddingTop: 16,
                    paddingBottom: 8,
                },
                titleText: {
                    fontSize: 20,
                    fontWeight: '600',
                    color: theme.text,
                    marginTop: 12,
                },
            }),
        [theme]
    );

    return (
        <View style={styles.container}>
            <OpenPrivyExpoAppLogo />
            <Text style={styles.titleText}>
                {"Open Privy Expo App"}
            </Text>
        </View>
    );
}
