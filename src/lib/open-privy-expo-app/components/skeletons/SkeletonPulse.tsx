import { useEffect, useRef } from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';

type SkeletonPulseProps = {
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

/** Opacity pulse for loading placeholders (matches profile balance skeleton intent). */
export function SkeletonPulse({ style, accessibilityLabel }: SkeletonPulseProps) {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 650,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[style, { opacity }]}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ busy: true }}
    />
  );
}
