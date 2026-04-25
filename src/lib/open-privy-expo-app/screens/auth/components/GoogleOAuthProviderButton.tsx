import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { resetRootStackToHome } from '@open-privy-expo-app/navigation/resetRootStackToHome';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import { useAnyOAuthLoginPending } from '../hooks/useAnyOAuthLoginPending';
import { useGoogleOAuthLoginMutation } from '../hooks/useGoogleOAuthLoginMutation';
import { OAuthProviderButton } from './OAuthProviderButton';

type GoogleOAuthProviderButtonProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
    setFormError: (error: unknown) => void;
    stacked?: boolean;
};

export function GoogleOAuthProviderButton({ navigation, setFormError, stacked }: GoogleOAuthProviderButtonProps) {
    const { theme } = useTheme();
    const mutation = useGoogleOAuthLoginMutation({
        onSuccess: () => resetRootStackToHome(navigation),
        onError: (err) => setFormError(err),
    });
    const oauthBusy = useAnyOAuthLoginPending();

    return (
        <OAuthProviderButton
            label="Continue with Google"
            onPress={() => mutation.mutate()}
            disabled={oauthBusy}
            stacked={stacked}
            icon={<Ionicons name="logo-google" size={22} color={theme.text} />}
        />
    );
}
