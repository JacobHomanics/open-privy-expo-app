import { useState, useRef, useCallback } from 'react';
import type { TextInput } from 'react-native';

const DIGIT_COUNT = 6;
const EMPTY_DIGITS = ['', '', '', '', '', ''];

type UseCodeInputParams = {
    onDigitChange?: () => void;
};

export function useVerifyCodeInput(params?: UseCodeInputParams) {
    const { onDigitChange } = params ?? {};
    const [codeDigits, setCodeDigits] = useState(EMPTY_DIGITS);
    const codeInputRefs = useRef<(TextInput | null)[]>([]);

    const clearCode = useCallback(() => {
        setCodeDigits(EMPTY_DIGITS);
    }, []);

    const focusFirst = useCallback(() => {
        setTimeout(() => codeInputRefs.current[0]?.focus(), 100);
    }, []);

    const handleCodeDigitChange = useCallback(
        (index: number, value: string) => {
            onDigitChange?.();
            if (value.length > 1) {
                const digits = value.replace(/\D/g, '').slice(0, DIGIT_COUNT);
                setCodeDigits((prev) => {
                    const newDigits = [...prev];
                    for (let i = 0; i < digits.length && index + i < DIGIT_COUNT; i++) {
                        newDigits[index + i] = digits[i];
                    }
                    const nextEmpty = newDigits.findIndex(
                        (d, i) => i >= index && !d
                    );
                    if (nextEmpty !== -1 && nextEmpty < DIGIT_COUNT) {
                        setTimeout(
                            () => codeInputRefs.current[nextEmpty]?.focus(),
                            0
                        );
                    }
                    return newDigits;
                });
                return;
            }

            const singleDigit = value.slice(-1).replace(/\D/g, '');
            setCodeDigits((prev) => {
                const next = [...prev];
                next[index] = singleDigit;
                return next;
            });

            if (singleDigit && index < DIGIT_COUNT - 1) {
                setTimeout(
                    () => codeInputRefs.current[index + 1]?.focus(),
                    0
                );
            }
        },
        [onDigitChange]
    );

    const handleCodeKeyPress = useCallback(
        (index: number, key: string) => {
            if (key === 'Backspace' && !codeDigits[index] && index > 0) {
                codeInputRefs.current[index - 1]?.focus();
            }
        },
        [codeDigits]
    );

    return {
        codeDigits,
        codeInputRefs,
        handleCodeDigitChange,
        handleCodeKeyPress,
        clearCode,
        focusFirst,
    };
}
