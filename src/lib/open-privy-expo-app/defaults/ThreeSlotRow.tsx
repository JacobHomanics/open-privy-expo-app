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
    const leftFlex = slotFlex?.left;
    const centerFlex = slotFlex?.center;
    const rightFlex = slotFlex?.right;

    return (
        <View style={styles.content}>
            <View style={[styles.slot, styles.leftSlot, { flex: leftFlex }]}>
                {left}
            </View>
            <View style={[styles.slot, styles.centerSlot, { flex: centerFlex }]}>
                {center}
            </View>
            <View style={[styles.slot, styles.rightSlot, { flex: rightFlex }]}>
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
