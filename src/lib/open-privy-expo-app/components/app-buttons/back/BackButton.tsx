import IoniconButton from "../../buttons/ionicon-button/IoniconButton";
import { SharedBackButtonProperties } from "./SharedBackButtonProperties";

export default function BackButton({ onPress }: { onPress: () => void }) {
    return <IoniconButton iconName={SharedBackButtonProperties.iconName} accessibilityLabel={SharedBackButtonProperties.accessibilityLabel} onPress={onPress} />
}