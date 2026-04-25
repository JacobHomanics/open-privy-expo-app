import { cloneElement } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '@open-privy-expo-app/screens/home/HomeScreen';
import ProfileScreen from '@open-privy-expo-app/screens/profile/ProfileScreen';
import { homeTabOptionsConfig, homeScreenContent } from '../configs/navigation';
import type { AppTabOptionsConfig } from './types/types';
import { useTheme } from '@open-privy-expo-app/theme';

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICON_SIZE = 24;

function buildTabOptionsWithDefaults(config: AppTabOptionsConfig) {
  const iconElement = config?.tabBarIcon ?? <Ionicons />;
  const { name, ...iconProps } = iconElement.props;

  return {
    ...config,
    tabBarIcon: ({ color }: { color: string }) =>
      cloneElement(iconElement, {
        name: name ?? 'home-outline',
        size: TAB_ICON_SIZE,
        color,
        ...iconProps,
      }),
  };
}

export default function MainTabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          elevation: 0,
          shadowOpacity: 0,
          paddingHorizontal: 24,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          paddingVertical: 8,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={buildTabOptionsWithDefaults(homeTabOptionsConfig)}
      >
        {(screenProps) => (
          <HomeScreen
            {...screenProps}
            Content={homeScreenContent}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={TAB_ICON_SIZE} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
