import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsMainScreen from '@open-privy-expo-app/screens/profile/screens/settings/SettingsScreen';
import LinkedAccountsScreen from '@open-privy-expo-app/screens/profile/screens/settings/LinkedAccountsScreen';
import AboutScreen from '@open-privy-expo-app/screens/profile/screens/settings/AboutScreen';
import LinkAccountEmailScreen from '@open-privy-expo-app/screens/profile/screens/settings/link-accounts/LinkAccountEmailScreen';
import LinkAccountPhoneNumberScreen from '@open-privy-expo-app/screens/profile/screens/settings/link-accounts/LinkAccountPhoneNumberScreen';
import VerifyLinkAccountCodeScreen from '@open-privy-expo-app/screens/profile/screens/settings/link-accounts/VerifyLinkAccountCodeScreen';

export type SettingsStackParamList = {
  SettingsMain: undefined;
  LinkedAccounts: undefined;
  About: undefined;
  LinkAccountEmail: undefined;
  LinkAccountPhoneNumber: undefined;
  VerifyLinkAccountCode: { type: 'email' | 'phone'; value: string };
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="SettingsMain"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SettingsMain" component={SettingsMainScreen} />
      <Stack.Screen name="LinkedAccounts" component={LinkedAccountsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="LinkAccountEmail" component={LinkAccountEmailScreen} />
      <Stack.Screen name="LinkAccountPhoneNumber" component={LinkAccountPhoneNumberScreen} />
      <Stack.Screen name="VerifyLinkAccountCode" component={VerifyLinkAccountCodeScreen} />
    </Stack.Navigator>
  );
}
