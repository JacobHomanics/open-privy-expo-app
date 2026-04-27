import { View, Text } from "react-native";
import { useState } from "react";
import { useEmailLoginCodeMutation } from "./hooks/useEmailLoginCodeMutation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@open-privy-expo-app/navigation/RootStack";
import { usePhoneNumberMutation } from "./hooks/usePhoneNumberLoginMutation";
import PhoneEmailTabs from "./components/PhoneEmailTabs";
import SendEmailFormContent from "@open-privy-expo-app/components/features/code-verification/send/SendEmailFormContent";
import SendPhoneNumberFormContent from "@open-privy-expo-app/components/features/code-verification/send/SendPhoneNumberFormContent";
import { isValidEmail, isValidUSCanadaPhone } from "@open-privy-expo-app/utils/validation";

type AuthMethod = "phoneNumber" | "email";

export default function Content() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [authMethod, setAuthMethod] = useState<AuthMethod>(
        "phoneNumber"
    );

    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const emailMutation = useEmailLoginCodeMutation({
        email,
        onSuccess: () =>
            navigation.navigate("VerifyAuthCodeEmail", { value: email.trim() }),
        // onError: (error) => setFormError(error),
    });

    const phoneNumberMutation = usePhoneNumberMutation({
        phoneNumber,
        onSuccess: () =>
            navigation.navigate("VerifyAuthCodePhoneNumber", {
                value: phoneNumber.trim(),
            }),
        // onError: (error) => setFormError(error),
    });

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

    return (
        <View>{(
            <PhoneEmailTabs value={authMethod} onChange={setAuthMethod} />
        )}
            {authMethod === "email" ? (
                <SendEmailFormContent
                    email={email}
                    onEmailChange={setEmail}
                    onSendCode={() => emailMutation.mutate()}
                    canContinue={isValidEmail(email)}
                    isLoading={emailMutation.isPending}
                />
            ) : (
                <SendPhoneNumberFormContent
                    phoneNumber={phoneNumber}
                    onPhoneNumberChange={setPhoneNumber}
                    onSendCode={() => phoneNumberMutation.mutate()}
                    canContinue={isValidUSCanadaPhone(phoneNumber)}
                    isLoading={phoneNumberMutation.isPending}
                />
            )}
        </View>
    );
}



