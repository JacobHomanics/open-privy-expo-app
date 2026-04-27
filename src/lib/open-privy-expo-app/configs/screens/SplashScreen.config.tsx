import { ReactNode } from "react";

export type SplashScreenConfig = {
    customContent?: ReactNode;
    requireAuthentication?: boolean;
}

export const config: SplashScreenConfig = {
    requireAuthentication: true
};