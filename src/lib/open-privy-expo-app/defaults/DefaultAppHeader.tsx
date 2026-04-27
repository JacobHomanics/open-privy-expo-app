import DefaultAppTextLogoAndName from '@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName';
import AppToggleButton from '@open-privy-expo-app/components/app-buttons/AppToggleButton';
import ThreeSlotRow from './ThreeSlotRow';
import { welcomeScreenHeaderConfig } from '@open-privy-expo-app/configs/screens/WelcomeScreen.config';
import { useTheme } from '@open-privy-expo-app/theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import AppCloseButton from '@open-privy-expo-app/components/app-buttons/AppCloseButton';
import AppBackButton from '@open-privy-expo-app/components/app-buttons/back-button/AppBackButton';
import ThemedBackButton from '@open-privy-expo-app/components/app-buttons/back-button/ThemedBackButton';
import BackButton from '@open-privy-expo-app/components/buttons/BackButton';

export default function DefaultAppHeader() {
    const { theme } = useTheme();
    const styles = useMemo(() => StyleSheet.create({
        closeButtonTouchable: {
            padding: 8,
            borderRadius: 20,
            backgroundColor: theme.border,
        },
    }), [theme]);

    return (
        <ThreeSlotRow
            left={welcomeScreenHeaderConfig?.left ?? <BackButton onPress={() => navigation.goBack()} />}
            center={welcomeScreenHeaderConfig?.center ?? <DefaultAppTextLogoAndName />}
            right={welcomeScreenHeaderConfig?.right ??
                <>
                    <AppToggleButton />
                    <AppCloseButton />
                </>
            }
            slotFlex={{
                left: 1,
                center: 3,
                right: 1,
            }}
        />
    );
}
