import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";

type SlotFlex = {
    left?: number;
    center?: number;
    right?: number;
};

type ThreeSlotRowProps = {
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
    slotFlex?: SlotFlex;
};

export default function ThreeSlotRow({ left, center, right, slotFlex }: ThreeSlotRowProps) {
    return (
        <View style={styles.content}>
            <View style={[styles.slot, styles.leftSlot, { flex: slotFlex?.left ?? 1 }]}>
                {left}
            </View>
            <View style={[styles.slot, styles.centerSlot, { flex: slotFlex?.center ?? 1 }]}>
                {center}
            </View>
            <View style={[styles.slot, styles.rightSlot, { flex: slotFlex?.right ?? 1 }]}>
                {right}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    slot: {
        gap: 8
    },
    leftSlot: {
        alignItems: 'flex-start',
    },
    rightSlot: {
        alignItems: 'flex-end',
    },
    centerSlot: {
        alignItems: 'center',
    },
});
