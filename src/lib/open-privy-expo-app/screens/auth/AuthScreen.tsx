import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useState } from 'react';
import AppScreenDefaultLayout from '@open-privy-expo-app/components/layouts/AppScreenDefaultLayout';
import { config } from '../../configs/screens/AuthScreen.config';
import { AuthFormContent } from './components/AuthFormContent';
import DefaultAppHeaderCenter from '@open-privy-expo-app/defaults/DefaultAppHeaderCenter';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthScreen({ navigation }: Props) {
    const [formError, setFormError] = useState<unknown>(null);

    return (
        <AppScreenDefaultLayout
            navigation={navigation}
            header={config?.customHeader ? config?.customHeader : (config?.hideHeader ? undefined : <DefaultAppHeaderCenter />)}
            stretchContent
            onBackPress={() => navigation.goBack()}
            error={formError}
            onErrorDismiss={() => setFormError(null)}
        >
            <AuthFormContent
                navigation={navigation}
                setFormError={setFormError}
            />
        </AppScreenDefaultLayout>
    );
}