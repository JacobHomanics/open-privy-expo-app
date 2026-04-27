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
        apple?: OAuthProviderConfig;
        google?: OAuthProviderConfig;
        twitter?: OAuthProviderConfig;
        farcaster?: OAuthProviderConfig;
    };
};

export type OAuthProviderConfig = {
    enabled?: boolean;
    customContent?: ReactNode;
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
        // oAuth: {
        //     apple: { enabled: true },
        //     google: { enabled: true },
        //     twitter: { enabled: true },
        //     farcaster: { enabled: true },
        // },

        // customBodyTopContent: <></>
        // customEmailContent: null,
        // customPhoneNumberContent: null,
    },
};
