import AppThemeToggleButton from "@open-privy-expo-app/components/AppThemeToggleButton";
import DefaultAppBackButton from "@open-privy-expo-app/components/DefaultAppBackButton";
import DefaultAppTextLogoAndName from "@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName";
import type { headerConfig } from "./types/headerConfig";
import type { ReactNode } from "react";
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

};

export const welcomeScreenHeaderConfig: headerConfig = {
    // left: <></>
    // center: <><DefaultAppTextLogoAndName /><DefaultAppTextLogoAndName /></>,
    // right: <><AppThemeToggleButton /><AppThemeToggleButton /><AppThemeToggleButton /></>,
};