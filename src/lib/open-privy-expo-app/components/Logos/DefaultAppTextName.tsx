import { useTheme } from '@open-privy-expo-app/theme';
import { StyleSheet, Text } from 'react-native';
import { appConfig } from '../../configs/app';
import { useMemo } from 'react';

export default function DefaultAppTextName() {
    const { theme } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                text: {
                    fontSize: 20,
                    fontWeight: '600',
                    color: theme.text,
                },
            }),
        [theme]
    );

    return (
        <Text style={[styles.text, { color: theme.text }]}>{appConfig.name}</Text>
    );
}
