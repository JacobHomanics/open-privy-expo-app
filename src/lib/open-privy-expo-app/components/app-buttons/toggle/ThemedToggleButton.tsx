import { Theme, ThemeMode } from "../../../theme/colors";
import ThemedIoniconButton from "../../buttons/ionicon-button/ThemedIoniconButton";
import { SharedToggleButtonProperties } from "./SharedToggleButtonProperties";

export default function ThemedToggleButton({ theme, mode, onPress }: { theme: Theme, mode: ThemeMode, onPress: () => void }) {
    return <ThemedIoniconButton iconName={mode === 'light' ? SharedToggleButtonProperties.lightIconName : SharedToggleButtonProperties.darkIconName} theme={theme} accessibilityLabel={mode === 'light' ? SharedToggleButtonProperties.lightAccessibilityLabel : SharedToggleButtonProperties.darkAccessibilityLabel} onPress={onPress} />
}