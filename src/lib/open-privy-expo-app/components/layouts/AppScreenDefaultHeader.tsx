import { useMemo, type ReactNode } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@open-privy-expo-app/theme';
import BackButton from '@open-privy-expo-app/components/buttons/BackButton';

type AppScreenDefaultHeaderProps = {
    navigation: NativeStackNavigationProp<any>;
    /** Optional center content below chrome (e.g. logo + title). */
    header?: ReactNode;
    /** When truthy, shows the back button. Press uses `navigation.goBack()`. */
    onBackPress?: () => void;
    /** When set, shows an X (top-right) that calls this; theme toggle moves to second row. */
    onClosePress?: () => void;
    /** When truthy, shows the theme toggle. */
    showThemeToggle?: boolean;
};

export default function AppScreenDefaultHeader({
    navigation,
    header,
    onBackPress,
    onClosePress,
    showThemeToggle = false,
}: AppScreenDefaultHeaderProps) {
    const { theme, mode, toggleMode } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                headerButton: {
                    position: 'absolute',
                    top: 16,
                    zIndex: 100,
                    elevation: 100,
                    padding: 8,
                },
                backButton: {
                    left: 16,
                },
                headerRightColumn: {
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    padding: 8,
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    zIndex: 100,
                    elevation: 100,
                    gap: 12,
                },
                headerRightFirstRow: {
                    padding: 0,
                },
                closeButtonTouchable: {
                    padding: 8,
                },
                themeToggleButton: {
                    padding: 10,
                    borderRadius: 20,
                    backgroundColor: theme.border,
                },
            }),
        [theme]
    );

    const themeToggleButton = () => {
        return (<Pressable
            style={({ pressed }) => [
                styles.themeToggleButton,
                pressed && { opacity: 0.8 },
            ]}
            onPress={toggleMode}
            accessibilityLabel={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            <Ionicons
                name={mode === 'light' ? 'moon-outline' : 'sunny-outline'}
                size={24}
                color={theme.text}
            />
        </Pressable>)
    }

    return (
        <>
            <View style={[styles.headerButton, styles.backButton]}>
                {onBackPress ? (
                    <BackButton onPress={() => navigation.goBack()} />
                ) : null}
            </View>
            <View style={styles.headerRightColumn}>
                <View style={styles.headerRightFirstRow}>
                    {onClosePress != null ? (
                        <Pressable
                            style={({ pressed }) => [
                                styles.closeButtonTouchable,
                                pressed && { opacity: 0.8 },
                            ]}
                            onPress={onClosePress}
                            accessibilityLabel="Close and go back to start"
                        >
                            <Ionicons name="close" size={28} color={theme.text} />
                        </Pressable>
                    ) : (
                        showThemeToggle && themeToggleButton()
                    )}
                </View>
                {onClosePress != null ? (
                    showThemeToggle && themeToggleButton()
                ) : null}
            </View>
            {header}
        </>
    );
}
