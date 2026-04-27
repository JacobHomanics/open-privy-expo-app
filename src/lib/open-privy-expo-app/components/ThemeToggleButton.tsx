import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "../theme/colors";

export default function ThemeToggleButton({ theme, mode, onPress }: { theme: Theme, mode: 'light' | 'dark', onPress: () => void }) {
    const styles = useMemo(() => StyleSheet.create({
        themeToggleButton: {
            padding: 10,
            borderRadius: 20,
            backgroundColor: theme.border,
        },
    }), [theme]);

    return <Pressable
        style={({ pressed }) => [
            styles.themeToggleButton,
            pressed && { opacity: 0.8 },
        ]}
        onPress={onPress}
        accessibilityLabel={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
        <Ionicons
            name={mode === 'light' ? 'moon-outline' : 'sunny-outline'}
            size={24}
            color={theme.text}
        />
    </Pressable>

}