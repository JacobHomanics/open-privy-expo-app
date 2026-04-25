import type { ComponentProps, ReactElement } from 'react';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export type IoniconElement = ReactElement<ComponentProps<typeof Ionicons>>;

export type AppTabOptionsConfig = Omit<BottomTabNavigationOptions, 'tabBarIcon'> & {
    tabBarIcon?: IoniconElement;
};
