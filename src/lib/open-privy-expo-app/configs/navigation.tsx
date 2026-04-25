import { Ionicons } from '@expo/vector-icons';
import type { AppTabOptionsConfig } from '../navigation/types/types';
import OpenPrivyExpoAppHomeScreenContent from 'src/screens/home/components/features/home/OpenPrivyExpoAppHomeScreenContent';

export const homeTabOptionsConfig: AppTabOptionsConfig = {
  title: 'Home',
  tabBarIcon: <Ionicons name="home-outline" />,
};

export const homeScreenContent = OpenPrivyExpoAppHomeScreenContent;
