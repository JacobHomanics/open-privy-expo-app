import { useTheme } from "@open-privy-expo-app/theme";
import AppIoniconButton from "./buttons/ionicon-button/AppIoniconButton";

export default function AppToggleButton() {
    const { mode, toggleMode } = useTheme();

    return <AppIoniconButton iconName={mode === 'light' ? 'moon-outline' : 'sunny-outline'} accessibilityLabel={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} onPress={toggleMode} />
}