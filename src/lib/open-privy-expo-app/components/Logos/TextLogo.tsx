import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";

export default function TextLogo({ text }: { text: string }) {
    const { theme } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                logoMark: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.border,
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                },
                logoMarkText: {
                    fontSize: 28,
                    fontWeight: '800',
                    color: theme.primary,
                    // letterSpacing: -1,
                },
            }),
        [theme]
    );

    return (
        <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>{text}</Text>
        </View>
    );
}
