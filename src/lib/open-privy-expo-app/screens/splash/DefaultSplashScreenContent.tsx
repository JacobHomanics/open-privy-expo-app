import { useEffect, useRef } from 'react';
import CircularSpinner from '@open-privy-expo-app/components/spinners/CircularSpinner';
import ErrorBottomSheet, { type ErrorBottomSheetRef } from '@open-privy-expo-app/components/bottom-sheets/ErrorBottomSheet';
import {
    GENERIC_ERROR_MESSAGE,
} from '@open-privy-expo-app/utils/Error Messages/errorMessages';
import DefaultAppTextLogoAndName from '@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName';

export default function DefaultSplashScreenContent({ errorMessage }: { errorMessage: string | null }) {
    const errorBottomSheetRef = useRef<ErrorBottomSheetRef>(null);

    useEffect(() => {
        if (errorMessage != null) {
            errorBottomSheetRef.current?.present();
        }
    }, [errorMessage]);

    return (
        <>
            <DefaultAppTextLogoAndName />
            <CircularSpinner />
            <ErrorBottomSheet
                ref={errorBottomSheetRef}
                error={errorMessage ?? GENERIC_ERROR_MESSAGE}
                onDismiss={() => { }}
            />
        </>);
}
