export function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** E.164: max 15 digits; we require at least 10 for a valid national number. */
export function isValidPhone(value: string): boolean {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
}

/** US & Canada only: 10 digits (national) or 11 digits starting with 1 (E.164). */
export function isValidUSCanadaPhone(value: string): boolean {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 10) return /^\d{10}$/.test(digits);
    if (digits.length === 11 && digits.startsWith('1'))
        return /^1\d{10}$/.test(digits);
    return false;
}
