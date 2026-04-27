import ThemedIoniconButton from "./buttons/ionicon-button/ThemedIoniconButton";
import { Theme } from "../theme/colors";

export default function ThemedToggleButton({ theme, mode, onPress }: { theme: Theme, mode: 'light' | 'dark', onPress: () => void }) {
    return <ThemedIoniconButton theme={theme} iconName={mode === 'light' ? 'moon-outline' : 'sunny-outline'} accessibilityLabel={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} onPress={onPress} />
}