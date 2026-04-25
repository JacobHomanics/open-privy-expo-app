import { useTheme } from '@open-privy-expo-app/theme';
import { useMemo } from 'react';
import type { TextStyle } from 'react-native';
import { Text } from 'react-native';

export default function WelcomeScreenBodyBottomContent() {
  const { theme } = useTheme();
  const tagline = useMemo(() => ({
    fontSize: 18,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: 280,
    alignSelf: 'center',
  }), [theme]) as TextStyle;
  return (
    <>
      <Text style={tagline}>Welcome to the app!</Text>
    </>
  );
}
