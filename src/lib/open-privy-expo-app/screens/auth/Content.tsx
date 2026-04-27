import { View, Text } from "react-native";
import { useMemo, useState } from "react";
import { ReactNode } from "react";
import { useEmailLoginCodeMutation } from "./hooks/useEmailLoginCodeMutation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { theme, useTheme } from "@open-privy-expo-app/theme";
import { RootStackParamList } from "@open-privy-expo-app/navigation/RootStack";
import { usePhoneNumberMutation } from "./hooks/usePhoneNumberLoginMutation";
import PhoneEmailTabs from "./components/PhoneEmailTabs";
import SendEmailFormContent from "@open-privy-expo-app/components/features/code-verification/send/SendEmailFormContent";
import SendPhoneNumberFormContent from "@open-privy-expo-app/components/features/code-verification/send/SendPhoneNumberFormContent";
import { isValidEmail, isValidUSCanadaPhone } from "@open-privy-expo-app/utils/validation";
import { config } from "@open-privy-expo-app/configs/screens/AuthScreen.config";
import { AuthAppleSignInButton } from "./components/AuthAppleSignInButton";
import { FarcasterOAuthProviderButton } from "./components/FarcasterOAuthProviderButton";
import { XOAuthProviderButton } from "./components/XOAuthProviderButton";
import { GoogleOAuthProviderButton } from "./components/GoogleOAuthProviderButton";
import { StyleSheet } from "react-native";
import { OAuthProviderConfig } from "@open-privy-expo-app/configs/screens/AuthScreen.config";

type AuthMethod = "phoneNumber" | "email";

const customEmailContent = config?.content?.customEmailContent;
const customPhoneNumberContent = config?.content?.customPhoneNumberContent;
const hasCodeBasedAuth = customEmailContent !== null || customPhoneNumberContent !== null;
const hasOauthAuth = Boolean(
    config?.content?.oAuth?.apple?.enabled
    || config?.content?.oAuth?.google?.enabled
    || config?.content?.oAuth?.twitter?.enabled
    || config?.content?.oAuth?.farcaster?.enabled
);

function renderOAuthProviderContent(
    providerConfig: OAuthProviderConfig | undefined,
    defaultContent: ReactNode
) {
    if (!providerConfig?.enabled) return null;
    return providerConfig.customContent ?? defaultContent;
}

export default function Content({ setFormError }: { setFormError: (error: unknown) => void }) {
    const { theme } = useTheme();

    const bodyTopContent = config?.content?.customBodyTopContent ?? <View>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.text, textAlign: 'center' }}>Create Account / Sign in</Text>
    </View>

    return (
        <View style={{ gap: 16 }}>
            {bodyTopContent}
            <OauthContent setFormError={setFormError} />
            <DividerContent />
            <PhoneEmailTabsContent setFormError={setFormError} />
        </View>
    );
}

const OauthContent = ({ setFormError }: { setFormError: (error: unknown) => void }) => {
    const { mode } = useTheme();
    return (
        <View style={{ gap: 12 }}>
            {renderOAuthProviderContent(
                config?.content?.oAuth?.apple,
                <AuthAppleSignInButton setFormError={setFormError} mode={mode} />
            )}
            {renderOAuthProviderContent(
                config?.content?.oAuth?.google,
                <GoogleOAuthProviderButton onError={setFormError} />
            )}
            {renderOAuthProviderContent(
                config?.content?.oAuth?.twitter,
                <XOAuthProviderButton onError={setFormError} />
            )}
            {renderOAuthProviderContent(
                config?.content?.oAuth?.farcaster,
                <FarcasterOAuthProviderButton onError={setFormError} />
            )}
        </View>
    );
}

const PhoneEmailTabsContent = ({ setFormError }: { setFormError: (error: unknown) => void }) => {
    const [authMethod, setAuthMethod] = useState<AuthMethod>(
        "phoneNumber"
    );

    return (
        <>
            {customEmailContent !== null && customPhoneNumberContent !== null && (
                <>
                    <PhoneEmailTabs value={authMethod} onChange={setAuthMethod} />
                    {authMethod === "email" ? <SendEmailFormContent onError={setFormError} /> : <SendPhoneNumberFormContent onError={setFormError} />}
                </>
            )}

            {customEmailContent !== null && customPhoneNumberContent === null && (
                <SendEmailFormContent title="Email" onError={setFormError} />
            )}
            {customEmailContent === null && customPhoneNumberContent !== null && (
                <SendPhoneNumberFormContent title="Phone Number" onError={setFormError} />
            )}
        </>
    );
}

const DividerContent = () => {
    const { theme } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                dividerRow: {
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 0,
                    marginHorizontal: 24,
                },
                dividerLine: {
                    flex: 1,
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: theme.border,
                },
                dividerLabel: {
                    fontSize: 14,
                    color: theme.textSecondary,
                },
            }),
        [theme],
    );

    return (
        <>
            {hasCodeBasedAuth && hasOauthAuth && (
                <View style={styles.dividerRow}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerLabel}>or</Text>
                    <View style={styles.dividerLine} />
                </View>
            )}
        </>
    );
}