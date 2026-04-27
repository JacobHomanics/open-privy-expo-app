import IoniconButton from "../../buttons/ionicon-button/IoniconButton";
import { SharedToggleButtonProperties } from "./SharedToggleButtonProperties";
import type { ThemeMode } from "@open-privy-expo-app/theme/colors";

export default function ToggleButton({ mode, onPress }: { mode: ThemeMode, onPress: () => void }) {
    return <IoniconButton iconName={mode === 'light' ? SharedToggleButtonProperties.lightIconName : SharedToggleButtonProperties.darkIconName} accessibilityLabel={mode === 'light' ? SharedToggleButtonProperties.lightAccessibilityLabel : SharedToggleButtonProperties.darkAccessibilityLabel} onPress={onPress} />
}