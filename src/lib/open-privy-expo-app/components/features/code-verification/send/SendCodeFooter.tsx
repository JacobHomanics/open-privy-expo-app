import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
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
    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    paddingHorizontal: 24,
                    paddingBottom: 8,
                },
                spinnerContainer: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 8,
                    paddingTop: 8,
                },
            }),
        []
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
