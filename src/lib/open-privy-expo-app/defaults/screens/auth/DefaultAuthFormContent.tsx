import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@open-privy-expo-app/theme";
import PhoneEmailTabs from '../../../screens/auth/components/PhoneEmailTabs';
import SendEmailFormContent from '@open-privy-expo-app/components/features/code-verification/send/SendEmailFormContent';
import SendPhoneNumberFormContent from '@open-privy-expo-app/components/features/code-verification/send/SendPhoneNumberFormContent';
import { isValidEmail, isValidUSCanadaPhone } from '../../../utils/validation';
import { useEmailLoginCodeMutation } from '../../../screens/auth/hooks/useEmailLoginCodeMutation';
import { usePhoneNumberMutation } from '../../../screens/auth/hooks/usePhoneNumberLoginMutation';
import { useGoogleOAuthLoginMutation } from '../../../screens/auth/hooks/useGoogleOAuthLoginMutation';
import { useAppleOAuthLoginMutation } from '../../../screens/auth/hooks/useAppleOAuthLoginMutation';
import { useTwitterOAuthLoginMutation } from '../../../screens/auth/hooks/useTwitterOAuthLoginMutation';
import { useFarcasterLoginMutation } from '../../../screens/auth/hooks/useFarcasterLoginMutation';
import { AuthAppleSignInButton } from '../../../screens/auth/components/AuthAppleSignInButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import FarcasterLogo from '@open-privy-expo-app/components/farcaster-logo';
import { authProviderFlags } from '../../../configs/authProviders';

type AuthMethod = "phoneNumber" | "email";

type DefaultAuthFormContentProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Auth">;
  setFormError: (error: unknown) => void;
};

export function DefaultAuthFormContent({
  navigation,
  setFormError,
}: DefaultAuthFormContentProps) {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(
    authProviderFlags.phoneNumber ? "phoneNumber" : "email",
  );

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const emailMutation = useEmailLoginCodeMutation({
    email,
    onSuccess: () =>
      navigation.navigate("VerifyAuthCodeEmail", { value: email.trim() }),
    onError: (error) => setFormError(error),
  });

  const phoneNumberMutation = usePhoneNumberMutation({
    phoneNumber,
    onSuccess: () =>
      navigation.navigate("VerifyAuthCodePhoneNumber", {
        value: phoneNumber.trim(),
      }),
    onError: (error) => setFormError(error),
  });

  const resetToHome = () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      }),
    );

  const googleOAuthMutation = useGoogleOAuthLoginMutation({
    onSuccess: resetToHome,
    onError: (error) => setFormError(error),
  });

  // NOTE: If issues with login, please do a thorough review of the twitter OAuth login setup on the Privy dashboard.
  const twitterOAuthMutation = useTwitterOAuthLoginMutation({
    onSuccess: resetToHome,
    onError: (error) => setFormError(error),
  });

  const appleOAuthMutation = useAppleOAuthLoginMutation({
    onSuccess: resetToHome,
    onError: (error) => setFormError(error),
  });

  const farcasterLoginMutation = useFarcasterLoginMutation({
    onSuccess: resetToHome,
    onError: (error) => setFormError(error),
  });

  const oauthPending =
    googleOAuthMutation.isPending ||
    appleOAuthMutation.isPending ||
    twitterOAuthMutation.isPending ||
    farcasterLoginMutation.isPending;

  const phoneEnabled = authProviderFlags.phoneNumber;
  const emailEnabled = authProviderFlags.email;
  const hasCodeBasedAuth = phoneEnabled || emailEnabled;
  const hasOauthAuth =
    authProviderFlags.google ||
    authProviderFlags.apple ||
    authProviderFlags.twitter ||
    authProviderFlags.farcaster;

  useEffect(() => {
    if (authMethod === "phoneNumber" && !phoneEnabled && emailEnabled) {
      setAuthMethod("email");
    }
    if (authMethod === "email" && !emailEnabled && phoneEnabled) {
      setAuthMethod("phoneNumber");
    }
  }, [authMethod, phoneEnabled, emailEnabled]);

  const { theme, mode } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        titleText: {
          fontSize: 20,
          fontWeight: "600",
          color: theme.text,
          marginBottom: 16,
          textAlign: "center",
        },
        dividerRow: {
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
          marginHorizontal: 24,
          gap: 12,
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
        oauthProviderButton: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginHorizontal: 24,
          paddingVertical: 14,
          borderRadius: 10,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.border,
          backgroundColor: theme.background,
        },
        oauthProviderButtonSpacing: {
          marginTop: 12,
        },
        oauthProviderButtonText: {
          fontSize: 16,
          fontWeight: "600",
          color: theme.text,
        },
      }),
    [theme],
  );
  return (
    <>
      {<Text style={styles.titleText}>{"Create Account / Sign in"}</Text>}
      {authProviderFlags.apple && (
        <AuthAppleSignInButton
          setFormError={setFormError}
          mode={mode}
        />
      )}
      {authProviderFlags.google && (
        <Pressable
          style={({ pressed }) => [
            styles.oauthProviderButton,
            styles.oauthProviderButtonSpacing,
            (pressed || oauthPending) && { opacity: 0.85 },
          ]}
          onPress={() => googleOAuthMutation.mutate()}
          disabled={oauthPending}
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
        >
          <Ionicons name="logo-google" size={22} color={theme.text} />
          <Text style={styles.oauthProviderButtonText}>Continue with Google</Text>
        </Pressable>
      )}
      {authProviderFlags.twitter && (
        <Pressable
          style={({ pressed }) => [
            styles.oauthProviderButton,
            styles.oauthProviderButtonSpacing,
            (pressed || oauthPending) && { opacity: 0.85 },
          ]}
          onPress={() => twitterOAuthMutation.mutate()}
          disabled={oauthPending}
          accessibilityRole="button"
          accessibilityLabel="Continue with X"
        >
          <Ionicons name="logo-twitter" size={22} color={theme.text} />
          <Text style={styles.oauthProviderButtonText}>Continue with X</Text>
        </Pressable>
      )}
      {authProviderFlags.farcaster && (
        <Pressable
          style={({ pressed }) => [
            styles.oauthProviderButton,
            styles.oauthProviderButtonSpacing,
            (pressed || oauthPending) && { opacity: 0.85 },
          ]}
          onPress={() => farcasterLoginMutation.mutate()}
          disabled={oauthPending}
          accessibilityRole="button"
          accessibilityLabel="Continue with Farcaster"
        >
          <FarcasterLogo />
          <Text style={styles.oauthProviderButtonText}>
            Continue with Farcaster
          </Text>
        </Pressable>
      )}
      {hasCodeBasedAuth && hasOauthAuth && (
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerLabel}>or</Text>
          <View style={styles.dividerLine} />
        </View>
      )}
      {phoneEnabled && emailEnabled && (
        <PhoneEmailTabs value={authMethod} onChange={setAuthMethod} />
      )}
      {emailEnabled && authMethod === "email" ? (
        <SendEmailFormContent
          title={!phoneEnabled ? "Email" : undefined}
          email={email}
          onEmailChange={setEmail}
          onSendCode={() => emailMutation.mutate()}
          canContinue={isValidEmail(email)}
          isLoading={emailMutation.isPending}
        />
      ) : phoneEnabled ? (
        <SendPhoneNumberFormContent
          phoneNumber={phoneNumber}
          title={!emailEnabled ? "Phone Number" : undefined}
          onPhoneNumberChange={setPhoneNumber}
          onSendCode={() => phoneNumberMutation.mutate()}
          canContinue={isValidUSCanadaPhone(phoneNumber)}
          isLoading={phoneNumberMutation.isPending}
        />
      ) : null}
    </>
  );
}
