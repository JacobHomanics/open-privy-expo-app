import { config } from '@open-privy-expo-app/configs/screens/WelcomeScreen.config';
import DefaultAppTextLogoAndName from '@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName';
import AppBackButton from '@open-privy-expo-app/components/app-buttons/back/AppBackButton';
import AppToggleButton from '@open-privy-expo-app/components/app-buttons/toggle/AppToggleButton';
import AppCloseButton from '@open-privy-expo-app/components/app-buttons/close/AppCloseButton';
import ThreeSlotRow from './ThreeSlotRow';

const defaultContent = {
    left: config?.header?.left?.customBackButton ?? <></>,
    center: config?.header?.center?.customContent ?? <DefaultAppTextLogoAndName customLogo={config?.header?.center?.customLogo} customName={config?.header?.center?.customName} />,
    right: <>
        {config?.header?.right?.customToggleButton ?? <AppToggleButton />}
        {config?.header?.right?.customCloseButton ?? <></>}
    </>
}

export default function DefaultAppWelcomeScreenHeader() {
    return (
        <ThreeSlotRow
            left={config?.header?.left?.customContent ?? defaultContent.left}
            center={config?.header?.center?.customContent ?? defaultContent.center}
            right={config?.header?.right?.customContent ?? defaultContent.right}
            slotFlex={{
                left: 1,
                center: 3,
                right: 1,
            }}
        />
    );
}
