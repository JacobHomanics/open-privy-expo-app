import type { HeaderConfig } from "./types/HeaderConfig";
import { Text } from "react-native";
import { ReactNode } from "react";

export type ContentConfig = {
    customContent?: ReactNode;
    customBodyTopContent?: ReactNode;
    loginButton?: {
        customContent?: ReactNode;
        customIcon?: ReactNode;
        customText?: string;
    }
    customBodyBottomContent?: ReactNode;
}

export type WelcomeScreenConfig = {
    header?: HeaderConfig;
    content?: ContentConfig;
};

export const config: WelcomeScreenConfig = {
    header: {
        left: {
            // customContent: <Text>Piece 3</Text>,
            // customBackButton: <Text>Piece 2</Text>,
        },
        center: {
            // customContent: <Text>Piece 3</Text>,
            // customLogo: <Text>Piece 1</Text>,
            // customName: <Text>Piece 2</Text>
        },
        right: {
            // customContent: <Text>Hello</Text>,
            // customToggleButton: <></>,
            // customCloseButton: <></>
        },
    },
    content: {
        // customBodyTopContent: <></>,
        // loginButton: {
        //     // customContent: <></>,
        //     // customIcon: <></>,
        //     // customText: 'LOGIN',
        // },
        // customBodyBottomContent: <></>,
    }
};