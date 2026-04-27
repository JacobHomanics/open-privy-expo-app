import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import DefaultAppTextLogoAndName from '@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName';
import AppThemeToggleButton from '@open-privy-expo-app/components/AppThemeToggleButton';
import DefaultAppBackButton from '@open-privy-expo-app/components/DefaultAppBackButton';
import AppHeader from './AppHeader';

export default function DefaultAppHeader() {

    return (
        <AppHeader /> //customLeftColumn={<></>} customCenterColumn={<></>} customRightColumn={<></>} />
    );
}
