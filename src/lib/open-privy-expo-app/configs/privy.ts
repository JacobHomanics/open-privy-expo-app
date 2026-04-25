import { MfaMethod } from "@privy-io/expo";

/**
 * Privy expects an HTTPS origin (no path) for passkey / MFA WebAuthn.
 * @see https://docs.privy.io/guide/security/mfa
 */
function normalizePrivyRelyingParty(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  try {
    const u = new URL(t.includes('://') ? t : `https://${t}`);
    if (u.protocol !== 'https:') return null;
    return u.origin;
  } catch {
    return null;
  }
}

const mfaRelyingPartyFromEnv =
  normalizePrivyRelyingParty(process.env.EXPO_PUBLIC_PRIVY_MFA_RELYING_PARTY ?? '') ??
  normalizePrivyRelyingParty(process.env.EXPO_PUBLIC_FARCASTER_RELYING_PARTY ?? '');

/** HTTPS origin for MFA / passkey; `null` if not configured (MFA disabled). */
export const PRIVY_MFA_RELYING_PARTY = mfaRelyingPartyFromEnv;

export const privyConfig = {
  ...(PRIVY_MFA_RELYING_PARTY ? { mfa: { relyingParty: PRIVY_MFA_RELYING_PARTY } } : {}),
  embedded: {
    ethereum: {
      createOnLogin: 'users-without-wallets' as const,
    },
  },
};

export const mfaMethods: MfaMethod[] = ['totp'];
