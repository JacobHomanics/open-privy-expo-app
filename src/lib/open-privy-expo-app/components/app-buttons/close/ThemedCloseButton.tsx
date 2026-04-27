import { Theme } from "../../../theme/colors";
import ThemedIoniconButton from "../../buttons/ionicon-button/ThemedIoniconButton";
import { SharedCloseButtonProperties } from "./SharedCloseButtonProperties";

export default function ThemedCloseButton({ theme, onPress }: { theme: Theme, onPress: () => void }) {
    return <ThemedIoniconButton iconName={SharedCloseButtonProperties.iconName} theme={theme} accessibilityLabel={SharedCloseButtonProperties.accessibilityLabel} onPress={onPress} />
}