import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList } from '@open-privy-expo-app/navigation/MainTabNavigator';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";

type HomeScreenOwnProps = {
  Content?: React.ComponentType;
};

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
> & HomeScreenOwnProps;

export default function HomeScreen({ Content }: Props) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.background,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      {Content ? (
        <Content />
      ) : null}
    </View>
  );
}
