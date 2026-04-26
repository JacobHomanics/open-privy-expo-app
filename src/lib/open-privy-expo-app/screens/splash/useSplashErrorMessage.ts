import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/expo';
import {
  attemptToResolveErrorMessage,
  CONNECTION_TIMEOUT_MESSAGE,
  getErrorMessage,
} from '@open-privy-expo-app/utils/Error Messages/errorMessages';

const CONNECTION_TIMEOUT_MS = 12_000;

export default function useSplashErrorMessage() {
  const { isReady, error: privyError } = usePrivy();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isReady || errorMessage != null) return;

    const timeoutId = setTimeout(() => {
      setErrorMessage(CONNECTION_TIMEOUT_MESSAGE);
    }, CONNECTION_TIMEOUT_MS);

    return () => clearTimeout(timeoutId);
  }, [isReady, errorMessage]);

  useEffect(() => {
    if (privyError != null) {
      setErrorMessage(attemptToResolveErrorMessage(getErrorMessage(privyError)));
    }
  }, [privyError]);

  return errorMessage;
}
