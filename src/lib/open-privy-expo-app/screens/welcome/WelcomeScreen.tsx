import { useMemo, useState } from 'react';
import { Platform, StyleSheet, View, Pressable, ScrollView, useWindowDimensions, TextStyle } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@open-privy-expo-app/navigation/RootStack';
import { useTheme } from "@open-privy-expo-app/theme";
import AppScreenDefaultLayout from '@open-privy-expo-app/components/layouts/AppScreenDefaultLayout';
import { config, SHOW_THEME_TOGGLE } from '@open-privy-expo-app/configs/screens/WelcomeScreen.config';
import DefaultBodyTopContent from '@open-privy-expo-app/defaults/screens/welcome/DefaultBodyTopContent';
import { Ionicons } from '@expo/vector-icons';
import DefaultBodyBottomContent from '@open-privy-expo-app/defaults/screens/welcome/DefaultBodyBottomContent';
type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
import { Text } from 'react-native';
import DefaultAppTextLogoAndName from '@open-privy-expo-app/components/Logos/DefaultAppTextLogoAndName';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultAppHeader from '@open-privy-expo-app/defaults/DefaultAppHeader';

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
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
    },
    centerScreen: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      //justifyContent: 'center',
    },
  }), [theme]);


  // const styles = useMemo(
  //   () =>
  //     StyleSheet.create({
  //       scroll: {
  //         flex: 1,
  //       },
  //       /**
  //        * Do not put `justifyContent: 'center'` on ScrollView `contentContainerStyle` — it breaks
  //        * scroll metrics so content below the fold can’t be reached. Centering is done on the
  //        * inner column with `minHeight` from the ScrollView’s measured height instead.
  //        */
  //       scrollContent: {
  //         paddingHorizontal: 24,
  //       },
  //       centerColumn: {
  //         justifyContent: 'center',
  //       },
  //       topSlot: {
  //         flexShrink: 0,
  //       },
  //       bottomSlot: {
  //         flexShrink: 0,
  //         paddingBottom: 32,
  //       },
  //       loginRow: {
  //         flexShrink: 0,
  //         alignItems: 'center',
  //         marginVertical: 16,
  //       },
  //       loginButton: {
  //         flexDirection: 'row',
  //         backgroundColor: theme.primary,
  //         paddingVertical: 14,
  //         paddingHorizontal: 32,
  //         borderRadius: 10,
  //         minWidth: 200,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         gap: 10,
  //       },
  //       loginButtonText: {
  //         color: theme.primaryContrast,
  //         fontSize: 18,
  //         fontWeight: '600',
  //       },
  //     }),
  //   [theme]
  // );

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

  // const loginButton = () => {
  //   return (
  //     <Pressable
  //       style={({ pressed }) => [styles.loginButton, pressed && { opacity: 0.8 }]}
  //       onPress={() => navigation.navigate('Auth')}
  //     >
  //       {config?.customLoginButton || loginButtonContent()}
  //     </Pressable>
  //   )
  // }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <DefaultAppHeader />

        <View style={styles.centerScreen}>
          <Text>Welcome</Text>
        </View>

      </SafeAreaView>
    </View>
    // <Text>Welcome</Text>
    // <AppScreenDefaultLayout navigation={navigation} header={config?.customHeader ? config?.customHeader : (config?.hideHeader ? undefined : <DefaultAppHeaderCenter />)} stretchContent showThemeToggle={SHOW_THEME_TOGGLE} >
    //   <ScrollView
    //     style={styles.scroll}
    //     onLayout={(e) => setScrollViewportHeight(e.nativeEvent.layout.height)}
    //     onContentSizeChange={(_, height) => setScrollContentHeight(height)}
    //     contentContainerStyle={styles.scrollContent}
    //     scrollEnabled={canScroll}
    //     alwaysBounceVertical={canScroll}
    //     bounces={canScroll}
    //     {...(Platform.OS === 'android' ? { overScrollMode: canScroll ? 'auto' : 'never' as const } : {})}
    //     keyboardShouldPersistTaps="handled"
    //     keyboardDismissMode="on-drag"
    //     nestedScrollEnabled
    //     showsVerticalScrollIndicator={canScroll}
    //   >
    //     <View style={[styles.centerColumn, { minHeight: centerColumnMinHeight }]}>
    //       <View style={styles.topSlot}>
    //         {config?.customTopBody ? config?.customTopBody : (config?.hideTopBody ? undefined : <DefaultBodyTopContent />)}
    //       </View>
    //       <View style={styles.loginRow}>
    //         {loginButton()}
    //       </View>
    //       <View style={styles.bottomSlot}>
    //         {config?.customBottomBody ? config?.customBottomBody : (config?.hideBottomBody ? undefined : <DefaultBodyBottomContent />)}
    //       </View>
    //     </View>
    //   </ScrollView>
    // </AppScreenDefaultLayout>
  );
}

