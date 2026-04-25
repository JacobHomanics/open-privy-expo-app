import PhoneNumberTextInput from './PhoneNumberTextInput';
import TextInputHint from './TextInputHint';

type Props = {
    value: string;
    onChangeText: (value: string) => void;
};

export default function PhoneNumberTextInputUSAndCanada({ value, onChangeText }: Props) {
    return (
        <>
            <PhoneNumberTextInput value={value} onChangeText={onChangeText} />
            <TextInputHint hint="US & Canada only" />
        </>
    );
}
