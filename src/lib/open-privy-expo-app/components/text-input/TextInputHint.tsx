import { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@open-privy-expo-app/theme";

type Props = {
    hint: string;
};

export default function TextInputHint({ hint }: Props) {
    const { theme } = useTheme();
    const styles = useMemo(
        () =>
            StyleSheet.create({
                hintSlot: {
                    minHeight: 28,
                    marginTop: 8,
                    justifyContent: 'center',
                },
                hintText: {
                    fontSize: 13,
                    color: theme.textSecondary ?? theme.text,
                    opacity: 0.8,
                },
            }),
        [theme]
    );
    return (
        <View style={styles.hintSlot}>
            <Text style={styles.hintText}>{hint}</Text>
        </View>
    );
}