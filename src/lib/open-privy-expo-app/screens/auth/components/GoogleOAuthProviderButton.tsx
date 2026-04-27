import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { resetRootStackToHome } from '@open-privy-expo-app/navigation/resetRootStackToHome';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import { useGoogleOAuthLoginMutation } from '../hooks/useGoogleOAuthLoginMutation';
import { OAuthProviderButton } from './OAuthProviderButton';
import { useNavigation } from '@react-navigation/native';

type GoogleOAuthProviderButtonProps = {
    setFormError: (error: unknown) => void;
    stacked?: boolean;
};

export function GoogleOAuthProviderButton({ setFormError }: GoogleOAuthProviderButtonProps) {
    const { theme } = useTheme();
    const mutation = useGoogleOAuthLoginMutation({});

    return (
        <OAuthProviderButton
            label="Continue with Google"
            mutation={mutation}
            onError={(err) => setFormError(err)}
            icon={<Ionicons name="logo-google" size={22} color={theme.text} />}
        />
    );
}
