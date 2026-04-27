import { Theme } from "../../../theme/colors";
import ThemedIoniconButton from "../../buttons/ionicon-button/ThemedIoniconButton";
import { SharedBackButtonProperties } from "./SharedBackButtonProperties";

export default function ThemedBackButton({ theme, onPress }: { theme: Theme, onPress: () => void }) {
    return <ThemedIoniconButton iconName={SharedBackButtonProperties.iconName} theme={theme} accessibilityLabel={SharedBackButtonProperties.accessibilityLabel} onPress={onPress} />
}