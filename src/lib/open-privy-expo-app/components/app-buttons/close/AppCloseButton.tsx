import { useNavigation } from "@react-navigation/native";
import AppIoniconButton from "@open-privy-expo-app/components/buttons/ionicon-button/AppIoniconButton";
import { SharedCloseButtonProperties } from "./SharedCloseButtonProperties";

export default function AppCloseButton() {
    const navigation = useNavigation();
    return <AppIoniconButton iconName={SharedCloseButtonProperties.iconName} accessibilityLabel={SharedCloseButtonProperties.accessibilityLabel} onPress={() => navigation.goBack()} />
}