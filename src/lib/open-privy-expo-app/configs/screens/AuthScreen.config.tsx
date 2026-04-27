import { ReactNode } from "react";

export type AuthScreenConfig = {
    header?: HeaderConfig;
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
};
