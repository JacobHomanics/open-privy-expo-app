import IoniconButton from "../../buttons/ionicon-button/IoniconButton";
import { SharedCloseButtonProperties } from "./SharedCloseButtonProperties";

export default function CloseButton({ onPress }: { onPress: () => void }) {
    return <IoniconButton iconName={SharedCloseButtonProperties.iconName} accessibilityLabel={SharedCloseButtonProperties.accessibilityLabel} onPress={onPress} />
}