import TextLogo from './TextLogo';
import { appConfig } from '../../configs/app';

export default function DefaultAppTextLogo() {
    return (
        <TextLogo text={appConfig.abbreviation} />
    );
}
