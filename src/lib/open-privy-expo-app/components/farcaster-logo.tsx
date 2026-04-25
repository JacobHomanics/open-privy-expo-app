import { Image } from 'react-native';

export default function FarcasterLogo() {
    return (
        <Image
            source={require('../../../assets/images/farcaster-logo.png')}
            style={{ width: 24, height: 24 }}
        />
    );
}