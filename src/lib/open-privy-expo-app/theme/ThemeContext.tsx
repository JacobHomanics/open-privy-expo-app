import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { light, dark, type Theme } from './colors';

type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme_mode';

type ThemeContextValue = {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    SecureStore.getItemAsync(THEME_STORAGE_KEY).then((saved) => {
      if (saved === 'light' || saved === 'dark') {
        setMode(saved);
      }
      hasLoadedRef.current = true;
    });
  }, []);

  useEffect(() => {
    if (!hasLoadedRef.current) return;
    SecureStore.setItemAsync(THEME_STORAGE_KEY, mode).catch(console.error);
  }, [mode]);

  const theme = mode === 'dark' ? dark : light;
  const toggleMode = useCallback(() => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  }, []);

  const value: ThemeContextValue = {
    theme,
    mode,
    setMode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
