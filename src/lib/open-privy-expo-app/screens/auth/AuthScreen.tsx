import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import AppScreenContainer from '@open-privy-expo-app/components/AppScreenContainer';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
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
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (formError) {
            errorBottomSheetRef.current?.present();
        }
    }, [formError]);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const subscription = Keyboard.addListener(showEvent, () => {
            requestAnimationFrame(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            });
        });

        return () => subscription.remove();
    }, []);

    return (
        <AppScreenContainer>
            <Header />
            <KeyboardAvoidingView style={{ flex: 1, marginTop: 16 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView
                        ref={scrollViewRef}
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1, paddingVertical: 16 }}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
                        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
                        showsVerticalScrollIndicator={true}
                    >
                        <Content
                            setFormError={(error: unknown) =>
                                setFormError(attemptToResolveErrorMessage(getErrorMessage(error)))
                            }
                        />
                    </ScrollView>
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