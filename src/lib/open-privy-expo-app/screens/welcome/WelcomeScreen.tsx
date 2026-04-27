import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@open-privy-expo-app/screens/welcome/Header';
import Content from './Content';

export default function WelcomeScreen() {
  const { theme } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.background,
    },
    safeArea: {
      flex: 1,
      width: '100%',
    },

  }), [theme]);


  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <Content />
      </SafeAreaView>
    </View>
  );
}

