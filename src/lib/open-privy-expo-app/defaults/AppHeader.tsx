import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";

export default function AppHeader({ leftColumnContent, centerColumnContent, rightColumnContent }: { leftColumnContent?: ReactNode, centerColumnContent?: ReactNode, rightColumnContent?: ReactNode }) {
    return (
        <View style={styles.content}>
            <View style={styles.headerLeftColumn}>
                {leftColumnContent}
            </View>
            <View style={styles.headerCenterColumn}>
                {centerColumnContent}
            </View>
            <View style={styles.headerRightColumn}>
                {rightColumnContent}
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