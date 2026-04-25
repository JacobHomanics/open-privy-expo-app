import { useMemo, useState } from 'react';
import { Platform, StyleSheet, View, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import AppScreenDefaultLayout from '@open-privy-expo-app/components/layouts/AppScreenDefaultLayout';
import { headerContent, topBodyContent, bottomBodyContent, loginButtonContent, SHOW_THEME_TOGGLE } from '@open-privy-expo-app/configs/screens/WelcomeScreenConfig';
type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

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

  const loginButton = () => {
    return (
      <Pressable
        style={({ pressed }) => [styles.loginButton, pressed && { opacity: 0.8 }]}
        onPress={() => navigation.navigate('Auth')}
      >
        {loginButtonContent()}
      </Pressable>
    )
  }

  return (
    <AppScreenDefaultLayout navigation={navigation} header={headerContent} stretchContent showThemeToggle={SHOW_THEME_TOGGLE} >
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
            {topBodyContent}
          </View>
          <View style={styles.loginRow}>
            {loginButton()}
          </View>
          <View style={styles.bottomSlot}>
            {bottomBodyContent}
          </View>
        </View>
      </ScrollView>
    </AppScreenDefaultLayout>
  );
}
