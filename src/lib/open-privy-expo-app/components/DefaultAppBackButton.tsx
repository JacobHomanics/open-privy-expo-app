import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "@open-privy-expo-app/theme";
import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
export default function DefaultAppBackButton() {
    const { theme } = useTheme();
    const navigation = useNavigation();

    const styles = useMemo(() => StyleSheet.create({
        backButton: {
            padding: 10,
            borderRadius: 20,
            backgroundColor: theme.border,
        },
    }), [theme]);
    return (
        <Pressable
            style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.8 }]}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
        >
            <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>
    );
}