import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useCallback } from 'react';
import VerifyLoginCodeContent from '@open-privy-expo-app/components/features/code-verification/verify/VerifyLoginCodeContent';
import { useAuthFlow } from '@open-privy-expo-app/context/AuthFlowContext';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyAuthCodePhoneNumber'>;

export default function VerifyAuthCodePhoneNumberScreen({ route, navigation }: Props) {
    const { value } = route.params;

    const { loginWithSMSCode, sendSMSCode } = useAuthFlow();

    const sendCode = useCallback(
        () => sendSMSCode({ phone: value.trim() }),
        [value, sendSMSCode]
    );

    const submitCode = useCallback(
        (code: string) => loginWithSMSCode({ code }),
        [loginWithSMSCode]
    );

    return (
        <VerifyLoginCodeContent
            value={value}
            sendCode={sendCode}
            submitCode={submitCode}
            onClosePress={() => navigation.goBack()}
            navigation={navigation}
        />
    );
}
