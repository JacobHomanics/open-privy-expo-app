import { isEthAddress } from "@open-privy-expo-app/utils/web3";

type LinkedAccount = {
    type?: string;
    address?: string;
    phone_number?: string;
    number?: string;
};

type UserWithPhone = { phone?: { number?: string }; linked_accounts?: unknown[] };
type UserWithEmail = { email?: { address?: string }; linked_accounts?: unknown[] };

export function getEmail(user: UserWithEmail | null): string | null {
    const u = user as UserWithEmail | null;
    const fromTopLevel = u?.email?.address;
    if (typeof fromTopLevel === 'string') return fromTopLevel;
    if (!u?.linked_accounts) return null;
    const account = (u.linked_accounts as LinkedAccount[]).find(
        (a) => a?.type === 'email' && typeof (a.address ?? (a as { email?: string }).email) === 'string'
    );
    const value = account?.address ?? (account as { email?: string })?.email;
    return typeof value === 'string' ? value : null;
}

export function getPhone(user: UserWithPhone | null): string | null {
    const u = user as UserWithPhone | null;
    const fromTopLevel = u?.phone?.number;
    if (typeof fromTopLevel === 'string') return fromTopLevel;
    if (!u?.linked_accounts) return null;
    const account = (u.linked_accounts as LinkedAccount[]).find(
        (a) => a?.type === 'phone'
    );
    const value = account?.phone_number ?? account?.number ?? account?.address;
    return typeof value === 'string' ? value : null;
}

type UserWithMfa = { mfa_methods?: readonly unknown[] | null };

/** True when the Privy user has at least one MFA method enrolled. */
export function isPrivyMfaEnabled(user: UserWithMfa | null | undefined): boolean {
    const methods = user?.mfa_methods;
    return Array.isArray(methods) && methods.length > 0;
}

export function getWalletAddress(
    wallet: { address?: string } | null,
    user: { linked_accounts?: unknown[] } | null
): string | null {
    const fromWallet = (wallet as { address?: string } | null)?.address;
    if (isEthAddress(fromWallet ?? '')) return fromWallet ?? null;
    const accounts = (user?.linked_accounts as LinkedAccount[] | undefined) ?? [];
    const walletAccount = accounts.find(
        (a) => a?.type === 'wallet' && isEthAddress(a.address ?? '')
    );
    return walletAccount?.address ?? null;
}

/** Privy linked account type for X (Twitter) OAuth. */
export type TwitterOAuthLinkedAccount = {
    type: 'twitter_oauth';
    username: string | null;
    name: string | null;
    subject: string;
};

export function getTwitterOAuthAccount(
    user: { linked_accounts?: unknown[] } | null
): TwitterOAuthLinkedAccount | null {
    const accounts = user?.linked_accounts;
    if (!Array.isArray(accounts)) return null;
    const raw = accounts.find(
        (a) =>
            typeof a === 'object' &&
            a !== null &&
            (a as { type?: string }).type === 'twitter_oauth'
    ) as TwitterOAuthLinkedAccount | undefined;
    if (!raw || typeof raw.subject !== 'string') return null;
    return raw;
}

/** Single-line label for settings UI: @handle, display name, or fallback. */
export function formatTwitterOAuthDisplay(account: TwitterOAuthLinkedAccount): string {
    if (account.username) return `@${account.username}`;
    if (account.name) return account.name;
    return 'X account';
}

/** Privy linked account type for Google OAuth. */
export type GoogleOAuthLinkedAccount = {
    type: 'google_oauth';
    email: string | null;
    name: string | null;
    subject: string;
};

export function getGoogleOAuthAccount(
    user: { linked_accounts?: unknown[] } | null
): GoogleOAuthLinkedAccount | null {
    const accounts = user?.linked_accounts;
    if (!Array.isArray(accounts)) return null;
    const raw = accounts.find(
        (a) =>
            typeof a === 'object' &&
            a !== null &&
            (a as { type?: string }).type === 'google_oauth'
    ) as Record<string, unknown> | undefined;
    if (!raw) return null;
    const subject = raw.subject;
    if (typeof subject !== 'string') return null;
    const email = raw.email;
    const name = raw.name;
    return {
        type: 'google_oauth',
        email: typeof email === 'string' ? email : null,
        name: typeof name === 'string' ? name : null,
        subject,
    };
}

/** Single-line label for settings UI: email, display name, or subject fallback. */
export function formatGoogleOAuthDisplay(account: GoogleOAuthLinkedAccount): string {
    if (account.email) return account.email;
    if (account.name) return account.name;
    return account.subject;
}

/** True when the user has Sign in with Apple linked (Privy `apple_oauth`). */
export function hasAppleOAuthLinkedAccount(
    user: { linked_accounts?: unknown[] } | null
): boolean {
    const accounts = user?.linked_accounts;
    if (!Array.isArray(accounts)) return false;
    return accounts.some(
        (a) =>
            typeof a === 'object' &&
            a !== null &&
            (a as { type?: string }).type === 'apple_oauth'
    );
}
