import FarcasterLogo from '@open-privy-expo-app/components/farcaster-logo';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { resetRootStackToHome } from '@open-privy-expo-app/navigation/resetRootStackToHome';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useAnyOAuthLoginPending } from '../hooks/useAnyOAuthLoginPending';
import { useFarcasterLoginMutation } from '../hooks/useFarcasterLoginMutation';
import { OAuthProviderButton } from './OAuthProviderButton';

type FarcasterOAuthProviderButtonProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
    setFormError: (error: unknown) => void;
    stacked?: boolean;
};

export function FarcasterOAuthProviderButton({ navigation, setFormError, stacked }: FarcasterOAuthProviderButtonProps) {
    const mutation = useFarcasterLoginMutation({
        onSuccess: () => resetRootStackToHome(navigation),
        onError: (err) => setFormError(err),
    });
    const oauthBusy = useAnyOAuthLoginPending();

    return (
        <OAuthProviderButton
            label="Continue with Farcaster"
            onPress={() => mutation.mutate()}
            disabled={oauthBusy}
            stacked={stacked}
            icon={<FarcasterLogo />}
        />
    );
}
