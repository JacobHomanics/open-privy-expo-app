import { useNavigation } from "@react-navigation/native";
import AppIoniconButton from "@open-privy-expo-app/components/buttons/ionicon-button/AppIoniconButton";
import { SharedCloseButtonProperties } from "./SharedCloseButtonProperties";
import { resetRootStackToWelcome } from "@open-privy-expo-app/navigation/resetRootStackToWelcome";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@open-privy-expo-app/navigation/RootStack";
import { resetRootStackToHome } from "@open-privy-expo-app/navigation/resetRootStackToHome";

export default function AppCloseButton() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Auth'>>();
    return <AppIoniconButton iconName={SharedCloseButtonProperties.iconName} accessibilityLabel={SharedCloseButtonProperties.accessibilityLabel} onPress={() => resetRootStackToWelcome(navigation)} />
}