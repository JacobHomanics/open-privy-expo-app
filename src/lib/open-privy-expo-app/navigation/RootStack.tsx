import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@open-privy-expo-app/screens/splash/SplashScreen';
import WelcomeScreen from '@open-privy-expo-app/screens/auth/WelcomeScreen';
import AuthScreen from '@open-privy-expo-app/screens/auth/AuthScreen';
import VerifyAuthCodeEmailScreen from '@open-privy-expo-app/screens/auth/screens/VerifyAuthCodeEmailScreen';
import VerifyAuthCodePhoneNumberScreen from '@open-privy-expo-app/screens/auth/screens/VerifyAuthCodePhoneNumberScreen';
import SettingsStack from './SettingsStack';
import MainTabNavigator from './MainTabNavigator';
import WalletScreen from '@open-privy-expo-app/screens/profile/screens/wallet/WalletScreen';
import WalletSettingsScreen from '@open-privy-expo-app/screens/profile/screens/settings/WalletSettingsScreen';
import {
  appRootStackRoutes,
  type AppRootStackParamList,
} from 'src/navigation/appRootStackConfig';

type BaseRootStackParamList = {
  Splash: undefined;
  Welcome: undefined;     // TODO: Remove this screen
  Auth: undefined;
  VerifyAuthCodeEmail: { value: string };
  VerifyAuthCodePhoneNumber: { value: string };
  Home: undefined;
  Settings: undefined;
  Wallet: undefined;
  WalletSettings: undefined;
};

export type RootStackParamList = BaseRootStackParamList & AppRootStackParamList;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="VerifyAuthCodeEmail" component={VerifyAuthCodeEmailScreen} />
      <Stack.Screen name="VerifyAuthCodePhoneNumber" component={VerifyAuthCodePhoneNumberScreen} />
      <Stack.Screen name="Home" component={MainTabNavigator} />
      <Stack.Screen name="Settings" component={SettingsStack} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="WalletSettings" component={WalletSettingsScreen} />
      {appRootStackRoutes.map((route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
}
