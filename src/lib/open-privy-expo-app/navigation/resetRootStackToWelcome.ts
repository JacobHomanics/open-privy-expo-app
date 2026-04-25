import { CommonActions } from '@react-navigation/native';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';

export function resetRootStackToWelcome(
    navigation: NavigationProp<ParamListBase>
) {
    navigation.getParent()?.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
        })
    );
}