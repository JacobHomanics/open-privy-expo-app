import { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList } from '@open-privy-expo-app/navigation/MainTabNavigator';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import { ProfileWalletButton } from './components/ProfileWalletButton';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;
export default function ProfileScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const rootNav = navigation.getParent();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.background,
        },
        content: {
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 56,
          paddingBottom: 48,
        },
        title: {
          fontSize: 28,
          fontWeight: '700',
          color: theme.text,
          marginBottom: 32,
          textAlign: 'center',
        },
        actions: {
          flex: 1,
          justifyContent: 'center',
          width: '100%',
        },
        settingsButton: {
          position: 'absolute',
          top: 56,
          left: 24,
          padding: 10,
          borderRadius: 20,
          backgroundColor: theme.border,
          zIndex: 10,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.settingsButton, pressed && { opacity: 0.8 }]}
        onPress={() => rootNav?.navigate('Settings')}
        accessibilityLabel="Open settings"
      >
        <Ionicons name="settings-outline" size={24} color={theme.text} />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.actions}>
          <ProfileWalletButton onPress={() => rootNav?.navigate('Wallet')} />
        </View>
      </View>
    </View>
  );
}
