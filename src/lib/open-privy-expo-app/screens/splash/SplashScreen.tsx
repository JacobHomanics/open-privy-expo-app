import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import DefaultSplashScreenContent from './DefaultSplashScreenContent';
import { config } from '@open-privy-expo-app/configs/screens/SplashScreen.config';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const { isReady, user } = usePrivy();
  const { theme } = useTheme();

  useEffect(() => {
    if (!isReady) return;

    if (user) {
      navigation.replace('Home');
    } else {
      navigation.replace('Welcome');
    }
  }, [isReady, user, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {config?.customContent ? config?.customContent : <DefaultSplashScreenContent />}
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
