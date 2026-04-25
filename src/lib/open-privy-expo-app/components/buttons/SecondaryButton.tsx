import { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useTheme } from "@open-privy-expo-app/theme";

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type Props = {
  label: string;
  onPress: () => void;
  icon: IoniconName;
  /** Optional second line (e.g. formatted USD). */
  subtitle?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Solid red CTA for destructive actions (e.g. disable MFA). */
  variant?: 'default' | 'destructive' | 'success';
};

const DESTRUCTIVE_BG = '#dc2626';
const DESTRUCTIVE_FG = '#ffffff';

const SUCCESS_BG = '#16a34a';
const SUCCESS_FG = '#ffffff';

export default function SecondaryButton({
  label,
  onPress,
  icon,
  subtitle,
  accessibilityLabel,
  disabled = false,
  style,
  variant = 'default',
}: Props) {
  const { theme } = useTheme();
  const destructive = variant === 'destructive';
  const success = variant === 'success';
  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 10,
          backgroundColor: theme.border,
        },
        buttonDestructive: {
          backgroundColor: DESTRUCTIVE_BG,
        },
        buttonSuccess: {
          backgroundColor: SUCCESS_BG,
        },
        buttonDisabled: {
          opacity: 0.5,
        },
        labelText: {
          fontSize: 16,
          fontWeight: '600',
          color: theme.text,
        },
        labelTextDestructive: {
          color: DESTRUCTIVE_FG,
        },
        labelTextSuccess: {
          color: SUCCESS_FG,
        },
        subtitleText: {
          marginTop: 2,
          fontSize: 13,
          fontWeight: '500',
          color: theme.textSecondary,
        },
        subtitleTextDestructive: {
          color: 'rgba(255,255,255,0.85)',
        },
        subtitleTextSuccess: {
          color: 'rgba(255,255,255,0.88)',
        },
        textColumn: {
          alignItems: 'flex-start',
        },
      }),
    [theme]
  );

  const iconColor = destructive ? DESTRUCTIVE_FG : success ? SUCCESS_FG : theme.text;

  const a11yLabel =
    accessibilityLabel ?? (subtitle ? `${label}, ${subtitle}` : label);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        destructive && styles.buttonDestructive,
        success && styles.buttonSuccess,
        style,
        disabled && styles.buttonDisabled,
        pressed && !disabled && { opacity: 0.8 },
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={a11yLabel}
    >
      <Ionicons name={icon} size={20} color={iconColor} />
      <View style={styles.textColumn}>
        <Text
          style={[
            styles.labelText,
            destructive && styles.labelTextDestructive,
            success && styles.labelTextSuccess,
          ]}
        >
          {label}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitleText,
              destructive && styles.subtitleTextDestructive,
              success && styles.subtitleTextSuccess,
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
