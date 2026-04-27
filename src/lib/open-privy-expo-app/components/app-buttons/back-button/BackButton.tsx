import IoniconButton from "../../buttons/ionicon-button/IoniconButton";

export default function BackButton({ onPress }: { onPress: () => void }) {
    return <IoniconButton iconName="arrow-back" accessibilityLabel="Go back" onPress={onPress} />
}