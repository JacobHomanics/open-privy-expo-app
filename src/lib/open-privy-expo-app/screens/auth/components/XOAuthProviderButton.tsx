import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { resetRootStackToHome } from '@open-privy-expo-app/navigation/resetRootStackToHome';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import { useAnyOAuthLoginPending } from '../hooks/useAnyOAuthLoginPending';
import { useTwitterOAuthLoginMutation } from '../hooks/useTwitterOAuthLoginMutation';
import { OAuthProviderButton } from './OAuthProviderButton';

type XOAuthProviderButtonProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
    setFormError: (error: unknown) => void;
    stacked?: boolean;
};

export function XOAuthProviderButton({ navigation, setFormError, stacked }: XOAuthProviderButtonProps) {
    const { theme } = useTheme();
    const mutation = useTwitterOAuthLoginMutation({
        onSuccess: () => resetRootStackToHome(navigation),
        onError: (err) => setFormError(err),
    });
    const oauthBusy = useAnyOAuthLoginPending();

    return (
        <OAuthProviderButton
            label="Continue with X"
            onPress={() => mutation.mutate()}
            disabled={oauthBusy}
            stacked={stacked}
            icon={<Ionicons name="logo-twitter" size={22} color={theme.text} />}
        />
    );
}
