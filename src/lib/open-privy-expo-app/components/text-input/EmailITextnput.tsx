import TextInputBase from './TextInputBase';

type Props = {
    value: string;
    onChangeText: (value: string) => void;
};

export default function EmailTextInput({ value, onChangeText }: Props) {
    return (
        <TextInputBase
            value={value}
            onChangeText={onChangeText}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoComplete="email"
        />
    );
}
