import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '@open-privy-expo-app/navigation/SettingsStack';
import { useCallback } from 'react';
import { useLinkEmail, useLinkSMS } from '@privy-io/expo';
import VerifyCodeContent from '@open-privy-expo-app/components/features/code-verification/verify/VerifyCodeContent';

type Props = NativeStackScreenProps<SettingsStackParamList, 'VerifyLinkAccountCode'>;

export default function VerifyLinkAccountCodeScreen({ route, navigation }: Props) {
    const { type, value } = route.params;
    const linkEmail = useLinkEmail({
        onLinkSuccess: () => navigation.popToTop(),
    });
    const linkSMS = useLinkSMS({
        onLinkSuccess: () => navigation.popToTop(),
    });

    const submitCode = useCallback(
        async (code: string) => {
            if (type === 'email') {
                await linkEmail.linkWithCode({ code, email: value.trim() });
            } else {
                await linkSMS.linkWithCode({ code, phone: value.trim() });
            }
        },
        [type, value, linkEmail, linkSMS]
    );

    const sendCode = useCallback(
        async () => {
            if (type === 'email') {
                await linkEmail.sendCode({ email: value.trim() });
            } else {
                await linkSMS.sendCode({ phone: value.trim() });
            }
        },
        [type, value, linkEmail, linkSMS]
    );

    return (
        <VerifyCodeContent
            value={value}
            submitCode={submitCode}
            sendCode={sendCode}
            onSuccess={() => navigation.popToTop()}
            onClosePress={() => navigation.popToTop()}
            onBackPress={() => navigation.goBack()}
            navigation={navigation}
        />
    );
}
