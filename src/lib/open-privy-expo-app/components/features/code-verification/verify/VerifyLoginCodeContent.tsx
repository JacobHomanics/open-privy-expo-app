import { CommonActions } from '@react-navigation/native';
import VerifyCodeContent, { type VerifyCodeContentProps } from './VerifyCodeContent';

type VerifyLoginCodeContentProps = Omit<VerifyCodeContentProps, 'onSuccess'>;

export default function VerifyLoginCodeContent({
    navigation,
    ...props
}: VerifyLoginCodeContentProps) {
    return (
        <VerifyCodeContent
            {...props}
            navigation={navigation}
            onSuccess={() =>
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })
                )
            }
        />
    );
}
