import { config } from '@open-privy-expo-app/configs/screens/WelcomeScreen.config';
import DefaultAppTextLogoAndName from '@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName';
import AppToggleButton from '@open-privy-expo-app/components/app-buttons/toggle/AppToggleButton';
import ThreeSlotRow from './ThreeSlotRow';

const defaultContent = {
    center: <DefaultAppTextLogoAndName customLogo={config?.header?.center?.customLogo} customName={config?.header?.center?.customName} />,
    right: <>
        {config?.header?.right?.customToggleButton ?? <AppToggleButton />}
    </>
}

export default function DefaultAppWelcomeScreenHeader() {
    return (
        <ThreeSlotRow
            left={<></>}
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
