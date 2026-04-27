import { useTheme } from "@open-privy-expo-app/theme";
import ThemeToggleButton from "./ThemeToggleButton";

export default function AppThemeToggleButton() {
    const { theme, mode, toggleMode } = useTheme();

    return <ThemeToggleButton theme={theme} mode={mode} onPress={toggleMode} />
}