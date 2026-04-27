import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "../../../theme/colors";
import IoniconButton from "./IoniconButton";

type IoniconsIconName = React.ComponentProps<typeof IoniconButton>["iconName"];

export default function ThemedIoniconButton({ iconName, theme, accessibilityLabel, onPress }: { iconName: IoniconsIconName, theme: Theme, accessibilityLabel: string, onPress?: () => void }) {
    const styles = useMemo(() => StyleSheet.create({
        iconButton: {
            backgroundColor: theme.border,
        }
    }), [theme]);

    return <IoniconButton iconName={iconName} iconColor={theme.text} accessibilityLabel={accessibilityLabel} onPress={onPress} style={styles.iconButton} />
}