import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { resetRootStackToHome } from '@open-privy-expo-app/navigation/resetRootStackToHome';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import { useTwitterOAuthLoginMutation } from '../hooks/useTwitterOAuthLoginMutation';
import { OAuthProviderButton } from './OAuthProviderButton';
import { useNavigation } from '@react-navigation/native';

type XOAuthProviderButtonProps = {
    onError: (error: unknown) => void;
    stacked?: boolean;
};

export function XOAuthProviderButton({ onError }: XOAuthProviderButtonProps) {
    const { theme } = useTheme();
    const mutation = useTwitterOAuthLoginMutation({});

    return (
        <OAuthProviderButton
            label="Continue with X"
            mutation={mutation}
            onError={(err) => onError(err)}
            icon={<Ionicons name="logo-twitter" size={22} color={theme.text} />}
        />
    );
}
