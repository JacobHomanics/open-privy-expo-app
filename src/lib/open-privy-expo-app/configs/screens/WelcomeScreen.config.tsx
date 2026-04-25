import { theme } from "@open-privy-expo-app/theme";
import type { ReactNode } from "react";
import { TextStyle } from "react-native";

export const SHOW_THEME_TOGGLE = true;

export type WelcomeScreenConfig = {
    header?: ReactNode;
    topBody?: ReactNode;
    bottomBody?: ReactNode;
    loginButton?: ReactNode;
};

// const loginButtonText: TextStyle = {
//     color: theme.primaryContrast,
//     fontSize: 18,
//     fontWeight: '600',
// };

export const config: WelcomeScreenConfig = {
    // header: <OpenPrivyExpoAppHeader />,
    // topBody: <OpenPrivyExpoAppHeader />,
    // bottomBody: <OpenPrivyExpoAppHeader />,
    // loginButton: <Text style={loginButtonText}>{"LOGIN"}</Text>,
};