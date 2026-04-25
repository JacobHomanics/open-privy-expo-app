import { useTheme } from '@open-privy-expo-app/theme';
import { useMemo } from 'react';
import type { TextStyle } from 'react-native';
import { Text } from 'react-native';

export default function DefaultBodyTopContent() {
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
      <Text style={tagline}>Use this app to create a next gen privy enabled app!</Text>

    </>
  );
}
