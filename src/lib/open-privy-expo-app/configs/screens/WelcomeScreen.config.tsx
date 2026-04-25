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