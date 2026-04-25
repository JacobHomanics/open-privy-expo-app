import DefaultAppHeaderCenter from "@open-privy-expo-app/defaults/DefaultAppHeaderCenter";
import DefaultBodyTopContent from "@open-privy-expo-app/defaults/screens/welcome/DefaultBodyTopContent";
import { ReactNode } from "react";
import { Text } from "react-native";

export type AuthScreenConfig = {
    hideHeader?: boolean;
    customHeader?: ReactNode;
    customAuthFormContent?: ReactNode;
};

export const config: AuthScreenConfig = {

};