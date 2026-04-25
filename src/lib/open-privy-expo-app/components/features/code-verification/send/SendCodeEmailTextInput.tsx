import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import EmailTextInput from '@open-privy-expo-app/components/text-input/EmailITextnput';

export function SendCodeEmailTextInput({
    email,
    onEmailChange,
}: {
    email: string;
    onEmailChange: (value: string) => void;
}) {
    const styles = useMemo(
        () =>
            StyleSheet.create({
                inputHintReserve: {
                    minHeight: 28,
                    marginTop: 8,
                },
            }),
        []
    );

    return (
        <>
            <EmailTextInput value={email} onChangeText={onEmailChange} />
            <View style={styles.inputHintReserve} />
        </>
    );
}
