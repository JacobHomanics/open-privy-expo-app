import DefaultAppTextLogoAndName from '@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName';
import AppThemeToggleButton from '@open-privy-expo-app/components/AppThemeToggleButton';
import DefaultAppBackButton from '@open-privy-expo-app/components/DefaultAppBackButton';
import ThreeSlotRow from './ThreeSlotRow';
import { welcomeScreenHeaderConfig } from '@open-privy-expo-app/configs/screens/WelcomeScreen.config';
export default function DefaultAppWelcomeScreenHeader() {
    return (
        <ThreeSlotRow
            left={welcomeScreenHeaderConfig?.left ?? <DefaultAppBackButton />}
            center={welcomeScreenHeaderConfig?.center ?? <DefaultAppTextLogoAndName />}
            right={welcomeScreenHeaderConfig?.right ?? <AppThemeToggleButton />}
        />
    );
}
