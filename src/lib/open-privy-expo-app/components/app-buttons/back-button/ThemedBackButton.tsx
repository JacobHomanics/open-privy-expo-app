import { Theme } from "../../../theme/colors";
import ThemedIoniconButton from "../../buttons/ionicon-button/ThemedIoniconButton";

export default function ThemedBackButton({ theme, onPress }: { theme: Theme, onPress: () => void }) {
    return <ThemedIoniconButton iconName="arrow-back" theme={theme} accessibilityLabel="Go back" onPress={onPress} />
}