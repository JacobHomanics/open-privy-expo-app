import { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const style = { flex: 1 }

export default function CustomGestureHandlerRootView({ children }: { children: ReactNode }) {

    return (
        <GestureHandlerRootView style={style}>
            {children}
        </GestureHandlerRootView>
    );
}