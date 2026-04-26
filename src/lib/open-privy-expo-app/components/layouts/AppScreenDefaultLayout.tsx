import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    ViewStyle,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from "@open-privy-expo-app/theme";
import ErrorBottomSheet, { type ErrorBottomSheetRef } from '@open-privy-expo-app/components/bottom-sheets/ErrorBottomSheet';
import AppScreenDefaultHeader from '@open-privy-expo-app/components/layouts/AppScreenDefaultHeader';
import { USE_ERROR_BOTTOM_SHEET } from '@open-privy-expo-app/constants/errors';
import { attemptToResolveErrorMessage, getErrorMessage } from '@open-privy-expo-app/utils/Error Messages/errorMessages';

type AppScreenDefaultLayoutProps = {
    navigation: NativeStackNavigationProp<any>;
    /** Optional top-of-screen content (e.g. app logo + title). */
    header?: ReactNode;
    /** Called when the back button is pressed. Defaults to navigation.goBack() when omitted. */
    onBackPress?: () => void;
    /** When set, shows an X button (top-right) that calls this to go all the way back (e.g. to Welcome). */
    onClosePress?: () => void;
    children: React.ReactNode;
    contentStyle?: ViewStyle;
    /** When true, the content block fills vertical space (e.g. for a sticky bottom footer). */
    stretchContent?: boolean;
    /** When set, the error bottom sheet is shown (when USE_ERROR_BOTTOM_SHEET is true). Resolved to a display string internally. */
    error?: unknown;
    /** Called when the error sheet is dismissed. Use to clear the error in parent state. */
    onErrorDismiss?: () => void;
    /** When truthy, shows the theme toggle. */
    showThemeToggle?: boolean;
};

export default function AppScreenDefaultLayout({
    navigation,
    header,
    onBackPress,
    onClosePress,
    children,
    contentStyle,
    stretchContent,
    error,
    onErrorDismiss,
    showThemeToggle = false,
}: AppScreenDefaultLayoutProps) {
    const { theme } = useTheme();
    const [bottomSheetError, setBottomSheetError] = useState<string | null>(null);
    const errorBottomSheetRef = useRef<ErrorBottomSheetRef>(null);

    useEffect(() => {
        if (error != null) {
            setBottomSheetError(attemptToResolveErrorMessage(getErrorMessage(error)));
            errorBottomSheetRef.current?.present();
        }
    }, [error]);

    const styles = useMemo(
        () =>
            StyleSheet.create({
                screen: { flex: 1, backgroundColor: theme.background },
                flex1: { flex: 1 },
                content: { flex: 1 },
                /** `minHeight: 0` so flex ancestors don’t grow to fit ScrollView content (which disables scrolling). */
                contentCenter: {
                    flex: 1,
                    minHeight: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                contentCenterStretch: {
                    justifyContent: 'flex-start',
                    paddingTop: 0,
                },
                centerBlock: { width: '100%', maxWidth: 400 },
                centerBlockStretch: { flex: 1, minHeight: 0 },
                screenContent: { flex: 1, minHeight: 0 },
                screenContentContainer: { flexGrow: 1 },
                formSection: {
                    paddingTop: 24,
                    paddingBottom: 24,
                },
            }),
        [theme]
    );

    const handleErrorDismiss = () => {
        onErrorDismiss?.();
        errorBottomSheetRef.current?.dismiss();
    };

    return (
        <View style={styles.screen}>
            <SafeAreaView style={styles.flex1}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' && !stretchContent ? 'padding' : undefined}
                    style={styles.flex1}
                >
                    <View style={styles.flex1}>
                        <View style={[styles.flex1, styles.content]}>
                            <AppScreenDefaultHeader
                                navigation={navigation}
                                header={header}
                                onBackPress={onBackPress}
                                onClosePress={onClosePress}
                                showThemeToggle={showThemeToggle}
                            />
                            <View
                                style={[
                                    styles.contentCenter,
                                    stretchContent && styles.contentCenterStretch,
                                    contentStyle,
                                ]}
                            >
                                <View style={[styles.centerBlock, stretchContent && styles.centerBlockStretch]}>
                                    {stretchContent ? (
                                        <ScrollView
                                            style={styles.screenContent}
                                            contentContainerStyle={[
                                                styles.screenContentContainer,
                                                Platform.OS === 'ios' && stretchContent && { paddingBottom: 48 },
                                            ]}
                                            keyboardShouldPersistTaps="handled"
                                            keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
                                            automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
                                            contentInsetAdjustmentBehavior="always"
                                            showsVerticalScrollIndicator={false}
                                        >
                                            <View style={styles.formSection}>
                                                {children}
                                            </View>
                                        </ScrollView>
                                    ) : (
                                        children
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>

            {USE_ERROR_BOTTOM_SHEET && (
                <ErrorBottomSheet
                    ref={errorBottomSheetRef}
                    error={bottomSheetError ?? ''}
                    onDismiss={handleErrorDismiss}
                />
            )}
        </View>
    );
}
