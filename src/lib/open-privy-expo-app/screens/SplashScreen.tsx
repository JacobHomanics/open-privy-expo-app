import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import CircularSpinner from '@open-privy-expo-app/components/spinners/CircularSpinner';
import DefaultAppLogo from '../defaults/logos/DefaultAppLogo';
import ErrorBottomSheet, { type ErrorBottomSheetRef } from '@open-privy-expo-app/components/bottom-sheets/ErrorBottomSheet';
import {
  attemptToResolveErrorMessage,
  getErrorMessage,
  CONNECTION_TIMEOUT_MESSAGE,
  GENERIC_ERROR_MESSAGE,
} from '@open-privy-expo-app/utils/Error Messages/errorMessages';
import { appConfig } from '../configs/app';
const CONNECTION_TIMEOUT_MS = 12_000;

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const { isReady, user, error: privyError } = usePrivy();
  const { theme } = useTheme();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const errorBottomSheetRef = useRef<ErrorBottomSheetRef>(null);

  useEffect(() => {
    if (!isReady) return;

    if (user) {
      navigation.replace('Home');
    } else {
      navigation.replace('Welcome');
    }
  }, [isReady, user, navigation]);

  useEffect(() => {
    if (isReady || errorMessage != null) return;

    const timeoutId = setTimeout(() => {
      setErrorMessage(CONNECTION_TIMEOUT_MESSAGE);
    }, CONNECTION_TIMEOUT_MS);

    return () => clearTimeout(timeoutId);
  }, [isReady, errorMessage]);

  useEffect(() => {
    if (privyError != null) {
      setErrorMessage(attemptToResolveErrorMessage(getErrorMessage(privyError)));
    }
  }, [privyError]);

  useEffect(() => {
    if (errorMessage != null) {
      errorBottomSheetRef.current?.present();
    }
  }, [errorMessage]);

  const handleDismiss = useCallback(() => {
    // Don't clear errorMessage here—only clear on Retry. Otherwise the sheet's
    // onChange(-1) can fire (e.g. during present) and hide the Retry button.
  }, []);

  const handleRetry = useCallback(() => {
    errorBottomSheetRef.current?.dismiss();
    setErrorMessage(null);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>{appConfig.name}</Text>
      <DefaultAppLogo />
      <View style={styles.spinner}>
        <CircularSpinner />
      </View>
      {errorMessage != null ? (
        <Pressable
          style={({ pressed }) => [
            styles.retryButton,
            { backgroundColor: theme.border },
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleRetry}
        >
          <Text style={[styles.retryButtonText, { color: theme.text }]}>Retry</Text>
        </Pressable>
      ) : null}
      <ErrorBottomSheet
        ref={errorBottomSheetRef}
        error={errorMessage ?? GENERIC_ERROR_MESSAGE}
        onDismiss={handleDismiss}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    marginBottom: 8,
  },
  spinner: {
    marginTop: 48,
  },
  retryButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
