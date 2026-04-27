import { StyleSheet, View } from 'react-native';
import DefaultAppTextLogo from './DefaultAppTextLogo';
import DefaultAppTextName from './DefaultAppTextName';
import type { ReactNode } from 'react';

export default function DefaultAppTextLogoAndName({ customLogo, customName }: { customLogo?: ReactNode, customName?: ReactNode }) {
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
        },
    });

    return (
        <View style={styles.container}>
            {customLogo ?? <DefaultAppTextLogo />}
            {customName ?? <DefaultAppTextName />}
        </View>
    );
}
