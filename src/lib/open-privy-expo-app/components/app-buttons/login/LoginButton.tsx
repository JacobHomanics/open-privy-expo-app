import { useTheme } from "@open-privy-expo-app/theme";
import { useNavigation } from "@react-navigation/native";
import { ReactNode, useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { RootStackParamList } from "@open-privy-expo-app/navigation/RootStack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function LoginButton({ customIcon, customText }: { customIcon?: ReactNode, customText?: string }) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { theme } = useTheme();

    const styles = useMemo(() => StyleSheet.create({
        loginButton: {
            flexDirection: 'row',
            backgroundColor: theme.primary,
            paddingVertical: 14,
            paddingHorizontal: 48,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
        },
        loginButtonText: {
            color: theme.primaryContrast,
            fontSize: 18,
            fontWeight: '600',
        },
    }), [theme]);

    return (
        <Pressable
            style={({ pressed }) => [styles.loginButton, pressed && { opacity: 0.8 }]}
            onPress={() => navigation.navigate('Auth')}
        >
            {customIcon ?? <Ionicons name="log-in-outline" size={22} color={theme.primaryContrast} />}
            {<Text style={styles.loginButtonText}>{customText ?? "Login"}</Text>}
        </Pressable>
    )
}