import { Theme } from "../../theme/colors";
import IoniconButton from "../buttons/ionicon-button/IoniconButton";

export default function CloseButton({ theme, onPress }: { theme: Theme, onPress: () => void }) {
    return <IoniconButton iconName="close-outline" iconColor={theme.text} accessibilityLabel="Close and go back to start" onPress={onPress} />
}