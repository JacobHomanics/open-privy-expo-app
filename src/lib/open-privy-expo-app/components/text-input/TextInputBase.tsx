import { useMemo } from 'react';
import { StyleSheet, TextInput, View, Pressable, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { useTheme } from "@open-privy-expo-app/theme";

type Props = {
    value: string;
    onChangeText: (value: string) => void;
    leftIcon?: ReactNode;
} & Pick<TextInputProps, 'placeholder' | 'keyboardType' | 'autoComplete'>;

export default function TextInputBase({ value, onChangeText, placeholder, keyboardType, autoComplete, leftIcon }: Props) {
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
                    paddingLeft: leftIcon ? 44 : 16,
                    paddingRight: 44,
                    paddingVertical: 14,
                    fontSize: 16,
                    color: theme.text,
                },
                leftIcon: {
                    position: 'absolute',
                    left: 14,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    zIndex: 1,
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
        [leftIcon, theme]
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
            {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
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
