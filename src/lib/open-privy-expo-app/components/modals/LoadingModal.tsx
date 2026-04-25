import { StyleSheet, Text, View, Modal } from "react-native";
import CircularSpinner from "../spinners/CircularSpinner";
import { useMemo } from "react";
import { useTheme } from "@open-privy-expo-app/theme";
export default function LoadingModal({ visible, children }: { visible: boolean, children: React.ReactNode }) {
    const { theme } = useTheme();

    const styles = useMemo(() => StyleSheet.create({
        loadingBackdrop: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.45)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingBox: {
            backgroundColor: theme.background,
            borderRadius: 16,
            padding: 32,
            alignItems: 'center',
            minWidth: 200,
            borderWidth: 1,
            borderColor: theme.border,
        },
        loadingText: {
            color: theme.text,
            fontWeight: '700',
            fontSize: 18,
            marginTop: 16,
            textAlign: 'center',
        },
    }), [theme]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={() => { }}
        >
            <View style={styles.loadingBackdrop}>
                <View style={styles.loadingBox}>
                    <CircularSpinner />
                    <Text style={styles.loadingText}>{children}</Text>
                </View>
            </View>
        </Modal>
    );
}