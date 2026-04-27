import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import DefaultAppTextLogoAndName from '@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName';
import AppThemeToggleButton from '@open-privy-expo-app/components/AppThemeToggleButton';
import DefaultAppBackButton from '@open-privy-expo-app/components/DefaultAppBackButton';

export default function DefaultAppHeader() {

    const styles = useMemo(() => StyleSheet.create({
        content: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
        },
    }), []);

    return (
        <View style={styles.content}>
            <DefaultAppBackButton />
            <DefaultAppTextLogoAndName />
            <AppThemeToggleButton />
        </View>
    );
}
