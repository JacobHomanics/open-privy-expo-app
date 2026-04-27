import FarcasterLogo from '@open-privy-expo-app/components/farcaster-logo';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { resetRootStackToHome } from '@open-privy-expo-app/navigation/resetRootStackToHome';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useFarcasterLoginMutation } from '../hooks/useFarcasterLoginMutation';
import { OAuthProviderButton } from './OAuthProviderButton';
import { useNavigation } from '@react-navigation/native';

type FarcasterOAuthProviderButtonProps = {
    setFormError: (error: unknown) => void;
};

export function FarcasterOAuthProviderButton({ setFormError }: FarcasterOAuthProviderButtonProps) {
    const mutation = useFarcasterLoginMutation({});

    return (
        <OAuthProviderButton
            label="Continue with Farcaster"
            mutation={mutation}
            onError={(err) => setFormError(err)}
            icon={<FarcasterLogo />}
        />
    );
}
