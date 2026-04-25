import TextInputBase from './TextInputBase';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@open-privy-expo-app/theme';

type Props = {
    value: string;
    onChangeText: (value: string) => void;
};

export default function PhoneNumberTextInput({ value, onChangeText }: Props) {
    const { theme } = useTheme();

    return (
        <TextInputBase
            value={value}
            onChangeText={onChangeText}
            placeholder="+1 (555) 000-0000"
            keyboardType="phone-pad"
            autoComplete="tel"
            leftIcon={<Ionicons name="phone-portrait-outline" size={20} color={theme.textSecondary} />}
        />
    );
}
