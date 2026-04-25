import { Ionicons } from "@expo/vector-icons";
import { theme } from "@open-privy-expo-app/theme";
import OpenPrivyExpoAppHeader from "src/components/OpenPrivyExpoAppHeader";
import WelcomeScreenMessageContent from "src/components/WelcomeScreenContent";
import { Text, TextStyle } from "react-native";

export const SHOW_THEME_TOGGLE = true;

export const headerContent = (
    <OpenPrivyExpoAppHeader />
);

export const topBodyContent = (
    <WelcomeScreenMessageContent />
);

export const bottomBodyContent = (
    <></>
);

export const loginButtonContent = () => {
    const loginButtonText = {
        color: theme.primaryContrast,
        fontSize: 18,
        fontWeight: '600',
    } as TextStyle;

    return (
        <>
            <Ionicons name="log-in-outline" size={22} color={theme.primaryContrast} />
            <Text style={loginButtonText}>{"Login"}</Text>
        </>
    );
}