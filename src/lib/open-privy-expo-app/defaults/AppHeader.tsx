import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";
import DefaultAppBackButton from "@open-privy-expo-app/components/DefaultAppBackButton";
import DefaultAppTextLogoAndName from "@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName";
import AppThemeToggleButton from "@open-privy-expo-app/components/AppThemeToggleButton";

export default function AppHeader({ customLeftColumn, customCenterColumn, customRightColumn }: { customLeftColumn?: ReactNode, customCenterColumn?: ReactNode, customRightColumn?: ReactNode }) {
    return (
        <View style={styles.content}>
            <View style={styles.headerLeftColumn}>
                {customLeftColumn ?? <><DefaultAppBackButton /><DefaultAppBackButton /></>}
            </View>
            <View style={styles.headerCenterColumn}>
                {customCenterColumn ?? <><DefaultAppTextLogoAndName /><DefaultAppTextLogoAndName /></>}
            </View>
            <View style={styles.headerRightColumn}>
                {customRightColumn ?? <><AppThemeToggleButton /><AppThemeToggleButton /><AppThemeToggleButton /></>}
            </View>
        </View>
    );
} const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    headerLeftColumn: {
        flex: 1,
        alignItems: 'flex-start',
        paddingTop: 12,
        gap: 8
    },
    headerRightColumn: {
        flex: 1,
        alignItems: 'flex-end',
        paddingTop: 12,
        gap: 8
    },
    headerCenterColumn: {
        flex: 3,
        alignItems: 'center',
        paddingTop: 12,
        gap: 8
    },
});