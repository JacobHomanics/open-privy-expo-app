import IoniconButton from "../buttons/ionicon-button/IoniconButton";

export default function ToggleButton({ mode, onPress }: { mode: 'light' | 'dark', onPress: () => void }) {
    return <IoniconButton iconName={mode === 'light' ? 'moon-outline' : 'sunny-outline'} accessibilityLabel={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} onPress={onPress} />
}