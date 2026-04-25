import TextInputBase from './TextInputBase';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@open-privy-expo-app/theme';

type Props = {
    value: string;
    onChangeText: (value: string) => void;
};

export default function EmailTextInput({ value, onChangeText }: Props) {
    const { theme } = useTheme();

    return (
        <TextInputBase
            value={value}
            onChangeText={onChangeText}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoComplete="email"
            leftIcon={<Ionicons name="mail-outline" size={20} color={theme.textSecondary} />}
        />
    );
}
