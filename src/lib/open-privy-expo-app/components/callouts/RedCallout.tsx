import type { ReactNode } from "react";
import { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

export const ERROR_RED = '#dc2626';
const ERROR_BACKGROUND_COLOR = '#fef2f2';

type RedCalloutProps = {
    error: string;
    icon?: ReactNode;
};

export default function RedCallout({ error, icon }: RedCalloutProps) {
    const styles = useMemo(() => StyleSheet.create({
        errorSlot: {
            minHeight: 80,
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: ERROR_BACKGROUND_COLOR,
            borderRadius: 10,
            padding: 4,
        },
        messageWrap: {
            flex: 1,
            justifyContent: 'center',
        },
        message: {
            fontSize: 14,
            color: ERROR_RED,
            lineHeight: 20,
        }
    }), []);
    return (
        <View style={styles.errorSlot}>
            {icon ? <View>{icon}</View> : null}
            <View style={styles.messageWrap}>
                <Text style={styles.message}>{error}</Text>
            </View>
        </View>
    );
}