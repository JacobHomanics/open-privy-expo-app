import { useNavigation } from "@react-navigation/native";
import AppIoniconButton from "@open-privy-expo-app/components/buttons/ionicon-button/AppIoniconButton";
import { SharedBackButtonProperties } from "./SharedBackButtonProperties";

export default function AppBackButton() {
    const navigation = useNavigation();

    return <AppIoniconButton iconName={SharedBackButtonProperties.iconName} accessibilityLabel={SharedBackButtonProperties.accessibilityLabel} onPress={() => navigation.goBack()} />
}