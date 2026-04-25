import { useTheme } from '@open-privy-expo-app/theme';
import { useMemo } from 'react';
import type { TextStyle } from 'react-native';
import { Text } from 'react-native';

export default function WelcomeScreenBodyTopContent() {
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
      <Text style={tagline}>Find your next favorite activity.</Text>
      <Text style={tagline}>Cure your bordeom!</Text>
      <Text style={tagline}>Satisfy your cravings!</Text>
      <Text style={tagline}>Satisfy your Weekend night!</Text>
      <Text style={tagline}>
        Personalized recommendations based on your TRAITS and CURRENT MOOD just for you.
      </Text>
      <Text style={tagline}>
        Find personalized hiking trails, restaurants, bars, arcades, watching sports, playing
        sports, churches, movies, movie theatres, and many more activities!
      </Text>
    </>
  );
}
