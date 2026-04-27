import { config } from '@open-privy-expo-app/configs/screens/WelcomeScreen.config';
import AppHeader from './AppHeader';
export default function DefaultAppWelcomeScreenHeader() {
    return (
        <AppHeader
            customLeftContent={config?.header?.left?.customContent}
            customCenterContent={config?.header?.center?.customContent}
            customRightContent={config?.header?.right?.customContent}
            customToggleButton={config?.header?.right?.customToggleButton}
            customCloseButton={config?.header?.right?.customCloseButton}
            customLogo={config?.header?.center?.customLogo}
            customName={config?.header?.center?.customName}
            customBackButton={config?.header?.left?.customBackButton}
        />
    );
}
