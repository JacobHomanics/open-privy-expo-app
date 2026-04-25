import DefaultAppLogo from "@open-privy-expo-app/defaults/logos/DefaultAppLogo";
import type { ReactNode } from "react";
import DefaultAppHeaderCenter from "@open-privy-expo-app/defaults/DefaultAppHeaderCenter";
export const SHOW_THEME_TOGGLE = true;

export type WelcomeScreenConfig = {
    hideHeader?: boolean;
    customHeader?: ReactNode;
    hideTopBody?: boolean;
    customTopBody?: ReactNode;
    hideBottomBody?: boolean;
    customBottomBody?: ReactNode;
    customLoginButton?: ReactNode;
};

export const config: WelcomeScreenConfig = {
    hideHeader: true,
    customHeader: <DefaultAppHeaderCenter />,
};