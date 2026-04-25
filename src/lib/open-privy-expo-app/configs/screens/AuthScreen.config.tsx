import { ReactNode } from "react";

export type AuthScreenConfig = {
    hideHeader?: boolean;
    customHeader?: ReactNode;
    customAuthFormContent?: ReactNode;
};

export const config: AuthScreenConfig = {

};