import { Platform, Share } from "react-native";


export function copyOrShare(value: string, label: string) {
    if (Platform.OS === 'web') {
        // Web: use clipboard API if available
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(value);
            return;
        }
    }
    Share.share({ message: value, title: label });
}   