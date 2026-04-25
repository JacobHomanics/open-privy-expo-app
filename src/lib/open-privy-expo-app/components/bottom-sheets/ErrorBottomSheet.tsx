import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetBackdrop,
    type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useTheme } from "@open-privy-expo-app/theme";
import { ERROR_RED } from '../callouts/RedCallout';

const ERROR_ICON_SIZE = 64;

export type ErrorBottomSheetRef = {
    present: () => void;
    dismiss: () => void;
};

type ErrorBottomSheetProps = {
    error: string;
    onDismiss: () => void;
};

const ErrorBottomSheet = forwardRef<ErrorBottomSheetRef, ErrorBottomSheetProps>(
    function ErrorBottomSheet({ error, onDismiss }, ref) {
        const { theme } = useTheme();
        const bottomSheetRef = useRef<BottomSheetModal>(null);

        useImperativeHandle(ref, () => ({
            present: () => bottomSheetRef.current?.present(),
            dismiss: () => bottomSheetRef.current?.dismiss(),
        }));

        const snapPoints = useMemo(() => ['40%'], []);

        const renderBackdrop = useCallback(
            (props: BottomSheetBackdropProps) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.4}
                />
            ),
            []
        );

        const handleChange = useCallback(
            (index: number) => {
                if (index === -1) onDismiss();
            },
            [onDismiss]
        );

        const styles = useMemo(
            () =>
                StyleSheet.create({
                    content: {
                        flex: 1,
                        paddingHorizontal: 24,
                        paddingBottom: 24,
                        backgroundColor: theme.background,
                    },
                    iconWrap: {
                        alignItems: 'center',
                        marginBottom: 40,
                    },
                    icon: {
                        marginTop: 0,
                        marginBottom: 0,
                    },
                    title: {
                        fontSize: 24,
                        fontWeight: '700',
                        color: theme.text,
                        textAlign: 'center',
                        marginBottom: 0,
                    },
                    messageWrap: {
                        borderRadius: 12,
                        padding: 8,
                        marginBottom: 40,
                    },
                    message: {
                        fontSize: 15,
                        color: ERROR_RED,
                        lineHeight: 22,
                        textAlign: 'center',
                    },
                    dismissButton: {
                        alignSelf: 'center',
                        backgroundColor: theme.primary,
                        paddingVertical: 14,
                        paddingHorizontal: 32,
                        borderRadius: 12,
                        alignItems: 'center',
                    },
                    dismissButtonText: {
                        color: theme.primaryContrast,
                        fontSize: 16,
                        fontWeight: '600',
                    },
                }),
            [theme]
        );

        const backgroundStyle = useMemo(
            () => ({ backgroundColor: theme.background }),
            [theme]
        );

        return (
            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                backgroundStyle={backgroundStyle}
                backdropComponent={renderBackdrop}
                onChange={handleChange}
                enablePanDownToClose
            >
                <BottomSheetView style={styles.content}>
                    <View style={styles.iconWrap}>
                        <Ionicons
                            name="alert-circle"
                            size={ERROR_ICON_SIZE}
                            color={ERROR_RED}
                            style={styles.icon}
                        />
                    </View>
                    <Text style={styles.title}>Error</Text>
                    <View style={styles.messageWrap}>
                        <Text style={styles.message}>{error}</Text>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            styles.dismissButton,
                            pressed && { opacity: 0.8 },
                        ]}
                        onPress={() => {
                            bottomSheetRef.current?.dismiss();
                            onDismiss();
                        }}
                    >
                        <Text style={styles.dismissButtonText}>OK</Text>
                    </Pressable>
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);

export default ErrorBottomSheet;
