import IoniconButton from "./IoniconButton";
import { useTheme } from "@open-privy-expo-app/theme";
import ThemedIoniconButton from "./ThemedIoniconButton";

type IoniconsIconName = React.ComponentProps<typeof IoniconButton>["iconName"];

export default function AppIoniconButton({ iconName, accessibilityLabel, onPress }: { iconName: IoniconsIconName, accessibilityLabel: string, onPress?: () => void }) {
    const { theme } = useTheme();
    return <ThemedIoniconButton iconName={iconName} theme={theme} accessibilityLabel={accessibilityLabel} onPress={onPress} />
}