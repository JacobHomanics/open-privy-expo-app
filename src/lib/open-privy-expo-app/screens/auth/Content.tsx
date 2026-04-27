import { View, Text } from "react-native";
import { useState } from "react";
import { useEmailLoginCodeMutation } from "./hooks/useEmailLoginCodeMutation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@open-privy-expo-app/theme";
import { RootStackParamList } from "@open-privy-expo-app/navigation/RootStack";
import { usePhoneNumberMutation } from "./hooks/usePhoneNumberLoginMutation";
import PhoneEmailTabs from "./components/PhoneEmailTabs";
import SendEmailFormContent from "@open-privy-expo-app/components/features/code-verification/send/SendEmailFormContent";
import SendPhoneNumberFormContent from "@open-privy-expo-app/components/features/code-verification/send/SendPhoneNumberFormContent";
import { isValidEmail, isValidUSCanadaPhone } from "@open-privy-expo-app/utils/validation";
import { config } from "@open-privy-expo-app/configs/screens/AuthScreen.config";
import { AuthAppleSignInButton } from "./components/AuthAppleSignInButton";

type AuthMethod = "phoneNumber" | "email";


const customEmailContent = config?.content?.customEmailContent;
const customPhoneNumberContent = config?.content?.customPhoneNumberContent;
const hasCodeBasedAuth = customEmailContent !== null || customPhoneNumberContent !== null;


export default function Content() {

    const oAuthContent = config?.content?.oAuth;
    const hasOauthAuth = oAuthContent?.apple !== null || oAuthContent?.google !== null || oAuthContent?.twitter !== null || oAuthContent?.farcaster !== null;

    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    //   const resetToHome = () =>
    //     navigation.dispatch(
    //       CommonActions.reset({
    //         index: 0,
    //         routes: [{ name: "Home" }],
    //       }),
    //     );

    //   const googleOAuthMutation = useGoogleOAuthLoginMutation({
    //     onSuccess: resetToHome,
    //     onError: (error) => setFormError(error),
    //   });

    //   // NOTE: If issues with login, please do a thorough review of the twitter OAuth login setup on the Privy dashboard.
    //   const twitterOAuthMutation = useTwitterOAuthLoginMutation({
    //     onSuccess: resetToHome,
    //     onError: (error) => setFormError(error),
    //   });

    //   const appleOAuthMutation = useAppleOAuthLoginMutation({
    //     onSuccess: resetToHome,
    //     onError: (error) => setFormError(error),
    //   });

    //   const farcasterLoginMutation = useFarcasterLoginMutation({
    //     onSuccess: resetToHome,
    //     onError: (error) => setFormError(error),
    //   });

    //   const oauthPending =
    //     googleOAuthMutation.isPending ||
    //     appleOAuthMutation.isPending ||
    //     twitterOAuthMutation.isPending ||
    //     farcasterLoginMutation.isPending;

    //   const phoneEnabled = authProviderFlags.phoneNumber;
    //   const emailEnabled = authProviderFlags.email;
    //   const hasCodeBasedAuth = phoneEnabled || emailEnabled;
    //   const hasOauthAuth =
    //     authProviderFlags.google ||
    //     authProviderFlags.apple ||
    //     authProviderFlags.twitter ||
    //     authProviderFlags.farcaster;

    const bodyTopContent = config?.content?.customBodyTopContent ?? <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text, textAlign: 'center' }}>Create Account / Sign in</Text>
    </View>

    return (
        <View>
            {bodyTopContent}
            <PhoneEmailTabsContent />
        </View>
    );
}

const PhoneEmailTabsContent = () => {
    const [authMethod, setAuthMethod] = useState<AuthMethod>(
        "phoneNumber"
    );

    return (
        <>
            {customEmailContent !== null && customPhoneNumberContent !== null && (
                <>
                    <PhoneEmailTabs value={authMethod} onChange={setAuthMethod} />
                    {authMethod === "email" ? <SendEmailFormContent /> : <SendPhoneNumberFormContent />}
                </>
            )}

            {customEmailContent !== null && customPhoneNumberContent === null && (
                <SendEmailFormContent title="Email" />
            )}
            {customEmailContent === null && customPhoneNumberContent !== null && (
                <SendPhoneNumberFormContent title="Phone Number" />
            )}
        </>
    );
}



