import { StyleSheet, View } from 'react-native';
import DefaultAppTextLogo from './DefaultAppTextLogo';
import DefaultAppTextName from './DefaultAppTextName';

export default function DefaultAppTextLogoAndName() {
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
        },
    });

    return (
        <View style={styles.container}>
            <DefaultAppTextLogo />
            <DefaultAppTextName />
        </View>
    );
}
