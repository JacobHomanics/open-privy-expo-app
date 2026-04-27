import DefaultAppTextLogoAndName from '@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName';
import AppThemeToggleButton from '@open-privy-expo-app/components/AppThemeToggleButton';
import DefaultAppBackButton from '@open-privy-expo-app/components/DefaultAppBackButton';
import AppHeader from './AppHeader';
import { welcomeScreenHeaderConfig } from '@open-privy-expo-app/configs/screens/WelcomeScreen.config';
export default function DefaultAppHeader() {
    return (
        <AppHeader
            leftColumnContent={welcomeScreenHeaderConfig?.leftColumnContent ?? <DefaultAppBackButton />}
            centerColumnContent={welcomeScreenHeaderConfig?.centerColumnContent ?? <DefaultAppTextLogoAndName />}
            rightColumnContent={welcomeScreenHeaderConfig?.rightColumnContent ?? <AppThemeToggleButton />}
        />
    );
}
