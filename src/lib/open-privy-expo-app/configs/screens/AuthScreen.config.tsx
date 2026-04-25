import DefaultAppHeaderCenter from "@open-privy-expo-app/defaults/DefaultAppHeaderCenter";
import DefaultBodyTopContent from "@open-privy-expo-app/defaults/screens/welcome/DefaultBodyTopContent";
import { ReactNode } from "react";

export type AuthScreenConfig = {
    hideHeader?: boolean;
    customHeader?: ReactNode;
    hideTopBody?: boolean;
    customTopBody?: ReactNode;
    hideBottomBody?: boolean;
};

export const config: AuthScreenConfig = {
};