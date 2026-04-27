import { ReactNode } from "react";

export type AuthScreenConfig = {
    header?: HeaderConfig;
    content?: ContentConfig;
};

export type ContentConfig = {
    customContent?: ReactNode;
    customBodyTopContent?: ReactNode;
    customEmailContent?: ReactNode | null;
    customPhoneNumberContent?: ReactNode | null;
    oAuth?: {
        apple?: ReactNode | null;
        google?: ReactNode | null;
        twitter?: ReactNode | null;
        farcaster?: ReactNode | null;
    };
};

export type HeaderConfig = {
    left?: {
        customContent?: ReactNode;
    }
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

export const config: AuthScreenConfig = {
    header: {
        left: {
            // customContent: <Text>Left</Text>,
        },
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
        // customBodyTopContent: <></>
        // customEmailContent: null,
        // customPhoneNumberContent: null,
    },
};
