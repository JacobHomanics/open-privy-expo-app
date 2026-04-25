import { useMemo } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";

const DIGIT_COUNT = 6;

type CodeDigitInputsProps = {
    codeDigits: string[];
    codeInputRefs: { current: (TextInput | null)[] };
    onDigitChange: (index: number, value: string) => void;
    onKeyPress: (index: number, key: string) => void;
    editable?: boolean;
};

export default function CodeDigitInputs({
    codeDigits,
    codeInputRefs,
    onDigitChange,
    onKeyPress,
    editable = true,
}: CodeDigitInputsProps) {
    const { theme } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                codeRow: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 16,
                },
                codeInput: {
                    width: 48,
                    height: 64,
                    borderWidth: 2,
                    borderColor: theme.border,
                    borderRadius: 8,
                    backgroundColor: theme.border,
                    marginHorizontal: 4,
                    color: theme.text,
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: '600',
                },
            }),
        [theme]
    );

    return (
        <View style={styles.codeRow}>
            {Array.from({ length: DIGIT_COUNT }, (_, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => {
                        codeInputRefs.current[index] = ref;
                    }}
                    value={codeDigits[index] ?? ''}
                    onChangeText={(v) => onDigitChange(index, v)}
                    onKeyPress={({ nativeEvent }) =>
                        onKeyPress(index, nativeEvent.key)
                    }
                    inputMode="numeric"
                    keyboardType="number-pad"
                    style={styles.codeInput}
                    selectTextOnFocus
                    editable={editable}
                />
            ))}
        </View>
    );
}
