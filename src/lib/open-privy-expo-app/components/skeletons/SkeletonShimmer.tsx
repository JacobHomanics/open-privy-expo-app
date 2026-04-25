import { useEffect, useId, useRef, useState } from 'react';
import {
  Animated,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

type SkeletonShimmerProps = {
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

/**
 * Horizontal shine sweep over a base color (set via `style.backgroundColor`).
 * Complements {@link SkeletonPulse} (opacity pulse) with a different visual.
 */
export function SkeletonShimmer({ style, accessibilityLabel }: SkeletonShimmerProps) {
  const gradId = `skeletonShimmer_${useId().replace(/:/g, '')}`;
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const translateX = useRef(new Animated.Value(0)).current;

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setLayout((prev) =>
      prev.width === width && prev.height === height ? prev : { width, height }
    );
  };

  useEffect(() => {
    const { width } = layout;
    if (width <= 0) return;

    const stripW = Math.max(width * 0.55, 48);
    translateX.setValue(-stripW);

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: width + stripW,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -stripW,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [layout, layout.width, translateX]);

  const { width: w, height: h } = layout;
  const stripW = w > 0 ? Math.max(w * 0.55, 48) : 0;

  return (
    <Animated.View
      style={[style, { overflow: 'hidden' }]}
      onLayout={onLayout}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ busy: true }}
    >
      {w > 0 && h > 0 && stripW > 0 ? (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: stripW,
            height: h,
            transform: [{ translateX }],
          }}
        >
          <Svg width={stripW} height={h}>
            <Defs>
              <LinearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                <Stop offset="0.45" stopColor="#ffffff" stopOpacity="0.22" />
                <Stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </LinearGradient>
            </Defs>
            <Rect width={stripW} height={h} fill={`url(#${gradId})`} />
          </Svg>
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}
