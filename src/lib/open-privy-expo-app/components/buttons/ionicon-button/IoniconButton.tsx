import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { StyleProp, ViewStyle } from "react-native";

type IoniconsIconName = React.ComponentProps<typeof Ionicons>["name"];

export default function IoniconButton({ iconName, iconColor, accessibilityLabel, onPress, style }: { iconName: IoniconsIconName, iconColor?: string, accessibilityLabel: string, onPress?: () => void, style?: StyleProp<ViewStyle> }) {
    return <Pressable
        style={({ pressed }) => [
            styles.iconButton,
            style,
            pressed && styles.iconButtonPressed,
        ]}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
    >
        <Ionicons
            name={iconName}
            size={24}
            color={iconColor}
        />
    </Pressable>
}

const styles = StyleSheet.create({
    iconButton: {
        padding: 10,
        borderRadius: 20,
    },
    iconButtonPressed: {
        opacity: 0.8,
    }
});