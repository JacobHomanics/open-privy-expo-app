import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import {
  attemptToResolveErrorMessage,
  getErrorMessage,
  CONNECTION_TIMEOUT_MESSAGE,
} from '@open-privy-expo-app/utils/Error Messages/errorMessages';
import DefaultSplashScreenContent from './DefaultSplashScreenContent';
const CONNECTION_TIMEOUT_MS = 12_000;

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const { isReady, user, error: privyError } = usePrivy();
  const { theme } = useTheme();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <DefaultSplashScreenContent errorMessage={errorMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24
  },
});
