import { useMemo, useState, type ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@open-privy-expo-app/theme";

export type CollapsibleMenuProps = {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function CollapsibleMenu({ title, children, defaultExpanded = false, style }: CollapsibleMenuProps) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          backgroundColor: theme.border,
          borderRadius: 12,
          overflow: 'hidden',
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 14,
        },
        headerText: {
          fontSize: 14,
          fontWeight: '700',
          color: theme.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
        },
        body: {
          borderTopWidth: 1,
          borderTopColor: theme.background,
          paddingHorizontal: 16,
          paddingVertical: 14,
        },
      }),
    [theme]
  );

  return (
    <View style={[styles.root, style]}>
      <Pressable
        style={({ pressed }) => [styles.header, pressed && { opacity: 0.8 }]}
        onPress={() => setExpanded((prev) => !prev)}
        accessibilityLabel={expanded ? `Collapse ${title}` : `Expand ${title}`}
      >
        <Text style={styles.headerText}>{title}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={theme.textSecondary}
        />
      </Pressable>
      {expanded ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}
