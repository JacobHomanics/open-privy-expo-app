import { ReactNode, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme";

export default function AppScreenContainer({ children }: { children: ReactNode }) {
    const { theme } = useTheme();
    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        safeArea: {
            flex: 1,
            width: '100%',
        },
    }), [theme]);
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {children}
            </SafeAreaView>
        </View>
    );
}