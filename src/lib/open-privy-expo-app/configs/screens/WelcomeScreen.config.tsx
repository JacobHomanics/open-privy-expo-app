import type { HeaderConfig } from "./types/HeaderConfig";
import { Text } from "react-native";

export type WelcomeScreenConfig = {
    header?: HeaderConfig;
};

export const config: WelcomeScreenConfig = {
    header: {
        left: {
            // customContent: <Text>Piece 3</Text>,
            // customBackButton: <Text>Piece 2</Text>,
        },
        center: {
            customContent: <Text>Piece 3</Text>,
            customLogo: <Text>Piece 1</Text>,
            customName: <Text>Piece 2</Text>
        },
        right: {
            // customContent: <Text>Hello</Text>,
            // customToggleButton: <></>,
            customCloseButton: <></>
        },
    }
};