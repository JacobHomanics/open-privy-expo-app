import { useMemo } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@open-privy-expo-app/theme";

type BackButtonProps = {
    onPress: () => void;
    accessibilityLabel?: string;
};

export default function BackButton({
    onPress,
    accessibilityLabel = 'Go back',
}: BackButtonProps) {
    const { theme } = useTheme();
    const styles = useMemo(
        () =>
            StyleSheet.create({
                touchable: { padding: 8 },
            }),
        []
    );

    return (
        <Pressable
            style={({ pressed }) => [styles.touchable, pressed && { opacity: 0.8 }]}
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}
        >
            <Ionicons name="arrow-back" size={28} color={theme.text} />
        </Pressable>
    );
}
