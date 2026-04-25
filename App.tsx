import 'fast-text-encoding';
import 'react-native-get-random-values';
import { Buffer } from 'buffer';
global.Buffer = Buffer;
import '@ethersproject/shims';

import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import Providers from '@open-privy-expo-app/providers/Providers';
import RootStack from '@open-privy-expo-app/navigation/RootStack';

export default function App() {
  useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  return (
    <Providers>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Providers>
  );
}
