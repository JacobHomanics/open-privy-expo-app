import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useState } from 'react';
import AppScreenDefaultLayout from '@open-privy-expo-app/components/layouts/AppScreenDefaultLayout';
import { headerContent, showTitleOnSingleAuthMethod, title } from './AuthScreenConfig';
import { AuthFormContent } from './components/AuthFormContent';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthScreen({ navigation }: Props) {
    const [formError, setFormError] = useState<unknown>(null);

    return (
        <AppScreenDefaultLayout
            navigation={navigation}
            header={headerContent}
            stretchContent
            onBackPress={() => navigation.goBack()}
            error={formError}
            onErrorDismiss={() => setFormError(null)}
        >
            <AuthFormContent
                navigation={navigation}
                setFormError={setFormError}
                showTitleOnSingleAuthMethod={showTitleOnSingleAuthMethod}
                title={title}
            />
        </AppScreenDefaultLayout>
    );
}