import { useMemo } from 'react';
import { StyleSheet, TextInput, View, Pressable, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@open-privy-expo-app/theme";

type Props = {
    value: string;
    onChangeText: (value: string) => void;
} & Pick<TextInputProps, 'placeholder' | 'keyboardType' | 'autoComplete'>;

export default function TextInputBase({ value, onChangeText, placeholder, keyboardType, autoComplete }: Props) {
    const { theme } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                wrapper: {
                    position: 'relative',
                },
                input: {
                    backgroundColor: theme.border,
                    borderRadius: 10,
                    paddingLeft: 16,
                    paddingRight: 44,
                    paddingVertical: 14,
                    fontSize: 16,
                    color: theme.text,
                },
                clearButton: {
                    position: 'absolute',
                    right: 12,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    padding: 4,
                },
            }),
        [theme]
    );

    return (
        <View style={styles.wrapper}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={theme.textSecondary}
                keyboardType={keyboardType}
                autoCapitalize="none"
                autoComplete={autoComplete}
            />
            {value.length > 0 && (
                <Pressable
                    style={({ pressed }) => [styles.clearButton, pressed && { opacity: 0.8 }]}
                    onPress={() => onChangeText('')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    accessibilityLabel="Clear"
                >
                    <Ionicons name="close-circle" size={22} color={theme.textSecondary} />
                </Pressable>
            )}
        </View>
    );
}
