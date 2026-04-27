
import AppIoniconButton from "@open-privy-expo-app/components/buttons/ionicon-button/AppIoniconButton";
import { SharedToggleButtonProperties } from "./SharedToggleButtonProperties";
import { useTheme } from "@open-privy-expo-app/theme";

export default function AppToggleButton() {
    const { mode, toggleMode } = useTheme();
    return <AppIoniconButton iconName={mode === 'light' ? SharedToggleButtonProperties.lightIconName : SharedToggleButtonProperties.darkIconName} accessibilityLabel={mode === 'light' ? SharedToggleButtonProperties.lightAccessibilityLabel : SharedToggleButtonProperties.darkAccessibilityLabel} onPress={toggleMode} />
}