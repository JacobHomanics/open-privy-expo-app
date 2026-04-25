import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { useLoginWithSMS, useLoginWithEmail, useLoginWithOAuth } from '@privy-io/expo';

type SmsHook = ReturnType<typeof useLoginWithSMS>;
type EmailHook = ReturnType<typeof useLoginWithEmail>;
type OauthHook = ReturnType<typeof useLoginWithOAuth>;

type AuthFlowContextValue = {
  sendSMSCode: SmsHook['sendCode'];
  sendEmailCode: EmailHook['sendCode'];
  loginWithSMSCode: SmsHook['loginWithCode'];
  loginWithEmailCode: EmailHook['loginWithCode'];
  loginWithOAuth: OauthHook['login'];
};

const AuthFlowContext = createContext<AuthFlowContextValue | null>(null);

export function AuthFlowProvider({ children }: { children: ReactNode }) {
  const sms = useLoginWithSMS();
  const email = useLoginWithEmail();
  const oauth = useLoginWithOAuth();

  const value = useMemo<AuthFlowContextValue>(
    () => ({
      sendSMSCode: sms.sendCode,
      sendEmailCode: email.sendCode,
      loginWithSMSCode: sms.loginWithCode,
      loginWithEmailCode: email.loginWithCode,
      loginWithOAuth: oauth.login,
    }),
    [sms.sendCode, sms.loginWithCode, email.sendCode, email.loginWithCode, oauth.login]
  );

  return (
    <AuthFlowContext.Provider value={value}>
      {children}
    </AuthFlowContext.Provider>
  );
}

export function useAuthFlow(): AuthFlowContextValue {
  const ctx = useContext(AuthFlowContext);
  if (!ctx) {
    throw new Error(
      'useAuthFlow must be used within an AuthFlowProvider'
    );
  }
  return ctx;
}
