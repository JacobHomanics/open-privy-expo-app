import TextInputBase from './TextInputBase';

type Props = {
    value: string;
    onChangeText: (value: string) => void;
};

export default function PhoneNumberTextInput({ value, onChangeText }: Props) {
    return (
        <TextInputBase
            value={value}
            onChangeText={onChangeText}
            placeholder="+1 (555) 000-0000"
            keyboardType="phone-pad"
            autoComplete="tel"
        />
    );
}
