import { ReactNode } from "react";

export type HeaderConfig = {
    left?: {
        customContent?: ReactNode;
        customBackButton?: ReactNode;
    }
    center?: {
        customContent?: ReactNode;
        customLogo?: ReactNode;
        customName?: ReactNode;
    }
    right?: {
        customContent?: ReactNode;
        customToggleButton?: ReactNode;
        customCloseButton?: ReactNode;
    };
};