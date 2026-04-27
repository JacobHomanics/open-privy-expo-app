import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import AppScreenContainer from '@open-privy-expo-app/components/AppScreenContainer';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
// import { config } from '../../configs/screens/AuthScreen.config';
// import { DefaultAuthFormContent } from '../../defaults/screens/auth/DefaultAuthFormContent';
// import DefaultAppHeaderCenter from '@open-privy-expo-app/defaults/DefaultAppHeaderCenter';
// import DefaultAppHeader from '@open-privy-expo-app/defaults/DefaultAppHeader';
import Header from './Header';
import Content from './Content';
import ErrorBottomSheet, { type ErrorBottomSheetRef } from '@open-privy-expo-app/components/bottom-sheets/ErrorBottomSheet';
import { useEffect, useRef, useState } from 'react';
import { attemptToResolveErrorMessage, getErrorMessage } from '@open-privy-expo-app/utils/Error Messages/errorMessages';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthScreen({ navigation }: Props) {
    const [formError, setFormError] = useState<string>("");
    const errorBottomSheetRef = useRef<ErrorBottomSheetRef>(null);

    useEffect(() => {
        if (formError) {
            errorBottomSheetRef.current?.present();
        }
    }, [formError]);

    return (
        <AppScreenContainer>
            <Header />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Content
                            setFormError={(error: unknown) =>
                                setFormError(attemptToResolveErrorMessage(getErrorMessage(error)))
                            }
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <ErrorBottomSheet
                ref={errorBottomSheetRef}
                error={formError}
                onDismiss={() => setFormError("")}
            />
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