import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import AppScreenContainer from '@open-privy-expo-app/components/AppScreenContainer';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
// import { useState } from 'react';
// import AppScreenDefaultLayout from '@open-privy-expo-app/components/layouts/AppScreenDefaultLayout';
// import { config } from '../../configs/screens/AuthScreen.config';
// import { DefaultAuthFormContent } from '../../defaults/screens/auth/DefaultAuthFormContent';
// import DefaultAppHeaderCenter from '@open-privy-expo-app/defaults/DefaultAppHeaderCenter';
// import DefaultAppHeader from '@open-privy-expo-app/defaults/DefaultAppHeader';
import Header from './Header';
import Content from './Content';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthScreen({ navigation }: Props) {
    // const [formError, setFormError] = useState<unknown>(null);

    return (
        <AppScreenContainer>
            <Header />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Content />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </AppScreenContainer>
        // <AppScreenDefaultLayout
        //     navigation={navigation}
        //     header={config?.customHeader ? config?.customHeader : (config?.hideHeader ? undefined : <DefaultAppHeader />)}
        //     stretchContent
        //     onBackPress={() => navigation.goBack()}
        //     error={formError}
        //     onErrorDismiss={() => setFormError(null)}
        // >
        //     {config?.customAuthFormContent ? config?.customAuthFormContent : (<DefaultAuthFormContent
        //         navigation={navigation}
        //         setFormError={setFormError}
        //     />)}
        // </AppScreenDefaultLayout>
    );
}