import { useEffect, useMemo, useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import PrimaryButton from '@open-privy-expo-app/components/buttons/PrimaryButton';
import CircularSpinner from '@open-privy-expo-app/components/spinners/CircularSpinner';

type Props = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
};

export default function SendCodeFooter({
    label,
    onPress,
    disabled = false,
    loading = false,
}: Props) {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const onShow = Keyboard.addListener(showEvent, (event) => {
            setKeyboardHeight(event.endCoordinates?.height ?? 0);
        });
        const onHide = Keyboard.addListener(hideEvent, () => {
            setKeyboardHeight(0);
        });

        return () => {
            onShow.remove();
            onHide.remove();
        };
    }, []);

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    paddingHorizontal: 24,
                    paddingBottom: 8 + keyboardHeight,
                },
                spinnerContainer: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 8,
                    paddingTop: 8,
                },
            }),
        [keyboardHeight]
    );

    const isDisabled = disabled || loading;

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.spinnerContainer}>
                    <CircularSpinner />
                </View>
            ) : (
                <PrimaryButton
                    label={label}
                    onPress={onPress}
                    disabled={isDisabled}
                    loading={loading}
                />
            )}

        </View>
    );
}
