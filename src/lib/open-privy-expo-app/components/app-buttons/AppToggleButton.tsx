import { useTheme } from "@open-privy-expo-app/theme";
import ToggleButton from "./ToggleButton";

export default function AppToggleButton() {
    const { theme, mode, toggleMode } = useTheme();

    return <ToggleButton mode={mode} onPress={toggleMode} />
}