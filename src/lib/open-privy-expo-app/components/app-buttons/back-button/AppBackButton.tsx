import { useNavigation } from "@react-navigation/native";
import AppIoniconButton from "../../buttons/ionicon-button/AppIoniconButton";

export default function AppBackButton() {
    const navigation = useNavigation();

    return <AppIoniconButton iconName="arrow-back" accessibilityLabel="Go back" onPress={() => navigation.goBack()} />
}