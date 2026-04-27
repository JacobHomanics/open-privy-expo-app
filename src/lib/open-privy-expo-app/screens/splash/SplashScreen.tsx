import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePrivy } from '@privy-io/expo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import DefaultSplashScreenContent from './DefaultSplashScreenContent';
import { config } from '@open-privy-expo-app/configs/screens/SplashScreen.config';
import AppScreenContainer from '@open-privy-expo-app/components/AppScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const { isReady, user, error: privyError } = usePrivy();
  const { theme } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24
    },

  }), [theme]);

  useEffect(() => {
    if (!config?.requireAuthentication && privyError) {
      navigation.replace('Home');
      return;
    }

    if (!isReady) return;

    if (user) {
      navigation.replace('Home');
    } else {
      if (config?.requireAuthentication) {
        navigation.replace('Welcome');
      } else {
        navigation.replace('Home');
      }
    }
  }, [isReady, user, navigation, privyError]);
  return (
    <AppScreenContainer>
      <View style={[styles.container]}>
        {config?.customContent ? config?.customContent : <DefaultSplashScreenContent />}
      </View>
    </AppScreenContainer>
  );
}
