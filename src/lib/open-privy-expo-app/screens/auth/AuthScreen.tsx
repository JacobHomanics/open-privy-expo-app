import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import AppScreenContainer from '@open-privy-expo-app/components/AppScreenContainer';
import { Keyboard, Platform, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
// import { config } from '../../configs/screens/AuthScreen.config';
// import { DefaultAuthFormContent } from '../../defaults/screens/auth/DefaultAuthFormContent';
// import DefaultAppHeaderCenter from '@open-privy-expo-app/defaults/DefaultAppHeaderCenter';
// import DefaultAppHeader from '@open-privy-expo-app/defaults/DefaultAppHeader';
import Header from './Header';
import Content from './Content';
import ErrorBottomSheet, { type ErrorBottomSheetRef } from '@open-privy-expo-app/components/bottom-sheets/ErrorBottomSheet';
import { useEffect, useRef, useState } from 'react';
import { attemptToResolveErrorMessage, getErrorMessage } from '@open-privy-expo-app/utils/Error Messages/errorMessages';
import { config } from '@open-privy-expo-app/configs/screens/AuthScreen.config';
import { useTheme } from '@open-privy-expo-app/theme';
import { Text } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthScreen({ navigation }: Props) {
    const [formError, setFormError] = useState<string>("");
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const errorBottomSheetRef = useRef<ErrorBottomSheetRef>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (formError) {
            errorBottomSheetRef.current?.present();
        }
    }, [formError]);

    useEffect(() => {
        const handleKeyboardShow = (event: { endCoordinates?: { height?: number } }) => {
            setKeyboardHeight(event.endCoordinates?.height ?? 0);
            requestAnimationFrame(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            });
        };

        const showSub = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
        const willShowSub = Keyboard.addListener('keyboardWillShow', handleKeyboardShow);
        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });
        const willHideSub = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardHeight(0);
        });

        return () => {
            showSub.remove();
            willShowSub.remove();
            hideSub.remove();
            willHideSub.remove();
        };
    }, []);

    const bodyTopContent = config?.content?.customBodyTopContent ?? <View>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.text, textAlign: 'center', marginTop: 16 }}>Create Account / Sign in</Text>
    </View>

    return (
        <AppScreenContainer>
            <Header />
            {bodyTopContent}

            <ScrollView
                ref={scrollViewRef}
                style={{ flex: 1, marginTop: 16 }}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                    paddingTop: 16,
                    paddingBottom: 0 + keyboardHeight - 30,
                }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
                automaticallyAdjustKeyboardInsets={false}
                showsVerticalScrollIndicator={true}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <Content
                        setFormError={(error: unknown) =>
                            setFormError(attemptToResolveErrorMessage(getErrorMessage(error)))
                        }
                    />
                </TouchableWithoutFeedback>
            </ScrollView>
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