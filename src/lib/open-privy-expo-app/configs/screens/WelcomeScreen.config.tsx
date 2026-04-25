import type { ReactNode } from "react";

export const SHOW_THEME_TOGGLE = true;

export type WelcomeScreenConfig = {
    header?: ReactNode;
    topBody?: ReactNode;
    bottomBody?: ReactNode;
    loginButton?: ReactNode;
};

export const config: WelcomeScreenConfig = {

};