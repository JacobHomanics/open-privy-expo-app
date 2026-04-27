
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

export type HeaderConfig = {
    center?: {
        customContent?: ReactNode;
        customLogo?: ReactNode;
        customName?: ReactNode;
    }
    right?: {
        customContent?: ReactNode;
        customToggleButton?: ReactNode;
    };
};

export const config: WelcomeScreenConfig = {
    header: {
        center: {
            // customContent: <Text>Piece 3</Text>,
            // customLogo: <Text>Piece 1</Text>,
            // customName: <Text>Piece 2</Text>
        },
        right: {
            // customContent: <Text>Hello</Text>,
            // customToggleButton: <></>,
        },
    },
    content: {
        // customBodyTopContent: <></>,
        loginButton: {
            // customContent: <></>,
            // customIcon: <></>,
            // customText: 'LOGIN',
        },
        // customBodyBottomContent: <></>,
    }
};