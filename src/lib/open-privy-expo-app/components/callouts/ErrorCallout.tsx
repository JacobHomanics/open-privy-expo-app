import { Ionicons } from "@expo/vector-icons";
import RedCallout, { ERROR_RED } from "./RedCallout";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
const ERROR_ICON_SIZE = 20;

export default function ErrorCallout({ error }: { error: string }) {
    const styles = useMemo(() => StyleSheet.create({
        icon: {
            marginRight: 10,
        },
    }), []);
    return (
        <RedCallout
            error={error}
            icon={
                <Ionicons
                    name="alert-circle"
                    size={ERROR_ICON_SIZE}
                    color={ERROR_RED}
                    style={styles.icon}
                />
            }
        />
    );
}
