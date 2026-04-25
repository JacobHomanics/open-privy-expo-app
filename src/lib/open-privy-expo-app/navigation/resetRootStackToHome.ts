import { CommonActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './RootStack';

export function resetRootStackToHome(
    navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>
) {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        })
    );
}

