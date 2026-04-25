import { useMemo, useState } from 'react';
import { Platform, StyleSheet, View, Pressable, ScrollView, useWindowDimensions, TextStyle } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import AppScreenDefaultLayout from '@open-privy-expo-app/components/layouts/AppScreenDefaultLayout';
import { config, SHOW_THEME_TOGGLE } from '@open-privy-expo-app/configs/screens/WelcomeScreen.config';
import OpenPrivyExpoAppHeader from 'src/components/OpenPrivyExpoAppHeader';
import WelcomeScreenBodyTopContent from 'src/components/WelcomeScreenBodyTopContent';
import { Ionicons } from '@expo/vector-icons';
import WelcomeScreenBodyBottomContent from 'src/components/WelcomeScreenBodyBottomContent';
type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
import { Text } from 'react-native';

export default function WelcomeScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const { height: windowHeight } = useWindowDimensions();
  const [scrollViewportHeight, setScrollViewportHeight] = useState(0);
  const [scrollContentHeight, setScrollContentHeight] = useState(0);

  /** Slop for sub-pixel layout; vertical padding must not live on `contentContainerStyle` or it inflates reported content height and forces scrolling. */
  const SCROLL_THRESHOLD_PX = 6;
  const canScroll =
    scrollViewportHeight > 0 &&
    scrollContentHeight - scrollViewportHeight > SCROLL_THRESHOLD_PX;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        scroll: {
          flex: 1,
        },
        /**
         * Do not put `justifyContent: 'center'` on ScrollView `contentContainerStyle` — it breaks
         * scroll metrics so content below the fold can’t be reached. Centering is done on the
         * inner column with `minHeight` from the ScrollView’s measured height instead.
         */
        scrollContent: {
          paddingHorizontal: 24,
        },
        centerColumn: {
          justifyContent: 'center',
        },
        topSlot: {
          flexShrink: 0,
        },
        bottomSlot: {
          flexShrink: 0,
          paddingBottom: 32,
        },
        loginRow: {
          flexShrink: 0,
          alignItems: 'center',
          marginVertical: 16,
        },
        loginButton: {
          flexDirection: 'row',
          backgroundColor: theme.primary,
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 10,
          minWidth: 200,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        },
        loginButtonText: {
          color: theme.primaryContrast,
          fontSize: 18,
          fontWeight: '600',
        },
      }),
    [theme]
  );

  const centerColumnMinHeight =
    scrollViewportHeight > 0 ? scrollViewportHeight : Math.round(windowHeight * 0.5);

  const loginButtonContent = () => {
    const loginButtonText: TextStyle = {
      color: theme.primaryContrast,
      fontSize: 18,
      fontWeight: '600',
    };

    return (
      <>
        {<Ionicons name="log-in-outline" size={22} color={theme.primaryContrast} />}
        <Text style={loginButtonText}>{"Login"}</Text>
      </>
    );
  }

  const loginButton = () => {
    return (
      <Pressable
        style={({ pressed }) => [styles.loginButton, pressed && { opacity: 0.8 }]}
        onPress={() => navigation.navigate('Auth')}
      >
        {config?.customLoginButton || loginButtonContent()}
      </Pressable>
    )
  }

  return (
    <AppScreenDefaultLayout navigation={navigation} header={config?.hideHeader ? undefined : <OpenPrivyExpoAppHeader />} stretchContent showThemeToggle={SHOW_THEME_TOGGLE} >
      <ScrollView
        style={styles.scroll}
        onLayout={(e) => setScrollViewportHeight(e.nativeEvent.layout.height)}
        onContentSizeChange={(_, height) => setScrollContentHeight(height)}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={canScroll}
        alwaysBounceVertical={canScroll}
        bounces={canScroll}
        {...(Platform.OS === 'android' ? { overScrollMode: canScroll ? 'auto' : 'never' as const } : {})}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        nestedScrollEnabled
        showsVerticalScrollIndicator={canScroll}
      >
        <View style={[styles.centerColumn, { minHeight: centerColumnMinHeight }]}>
          <View style={styles.topSlot}>
            {config?.hideTopBody ? undefined : (config?.customTopBody || <WelcomeScreenBodyTopContent />)}
          </View>
          <View style={styles.loginRow}>
            {loginButton()}
          </View>
          <View style={styles.bottomSlot}>
            {config?.customBottomBody || <WelcomeScreenBodyBottomContent />}
          </View>
        </View>
      </ScrollView>
    </AppScreenDefaultLayout>
  );
}
