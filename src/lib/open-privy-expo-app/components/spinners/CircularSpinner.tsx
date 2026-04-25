import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";

const CIRCLE_SIZE = 56;
const STROKE_WIDTH = 2;

export default function CircularSpinner() {
  const { theme } = useTheme();
  const spin = useRef(new Animated.Value(0)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        spinnerCircle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        spinnerArc: {
          position: 'absolute',
          borderTopColor: theme.primary,
          borderRightColor: theme.primary,
          borderBottomColor: theme.primary,
          borderLeftColor: 'transparent',
        },
      }),
    [theme]
  );

  const run = useCallback(() => {
    spin.setValue(0);
    animRef.current = Animated.timing(spin, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    });
    animRef.current.start(({ finished }) => {
      if (finished) run();
    });
  }, [spin]);

  useEffect(() => {
    run();
    return () => {
      animRef.current?.stop();
    };
  }, [run]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.spinnerCircle, { width: CIRCLE_SIZE, height: CIRCLE_SIZE }]}>
      <Animated.View
        style={[
          styles.spinnerArc,
          {
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: CIRCLE_SIZE / 2,
            borderWidth: STROKE_WIDTH,
            transform: [{ rotate }],
          },
        ]}
      />
    </View>
  );
}
