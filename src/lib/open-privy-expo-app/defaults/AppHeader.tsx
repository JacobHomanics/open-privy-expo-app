import DefaultAppTextLogoAndName from '@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName';
import AppToggleButton from '@open-privy-expo-app/components/app-buttons/toggle/AppToggleButton';
import ThreeSlotRow from './ThreeSlotRow';
import AppCloseButton from '@open-privy-expo-app/components/app-buttons/close/AppCloseButton';
import AppBackButton from '@open-privy-expo-app/components/app-buttons/back/AppBackButton';
import type { ReactNode } from 'react';

export default function AppHeader({ customLeftContent, customCenterContent, customRightContent, customToggleButton, customCloseButton, customLogo, customName, customBackButton }: { customLeftContent?: ReactNode, customCenterContent?: ReactNode, customRightContent?: ReactNode, customToggleButton?: ReactNode, customCloseButton?: ReactNode, customLogo?: ReactNode, customName?: ReactNode, customBackButton?: ReactNode }) {
    return (
        <ThreeSlotRow
            left={customLeftContent ?? customBackButton ?? <AppBackButton />}
            center={customCenterContent ?? <DefaultAppTextLogoAndName customLogo={customLogo} customName={customName} />}
            right={customRightContent ?? <>
                {customToggleButton ?? <AppToggleButton />}
                {customCloseButton ?? <AppCloseButton />}
            </>}
            slotFlex={{
                left: 1,
                center: 3,
                right: 1,
            }}
        />
    );
}
