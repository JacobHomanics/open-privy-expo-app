import { View, Text, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@open-privy-expo-app/theme";
import { createTertiaryCardStyles } from "./TertiaryCard.styles";

export type TertiaryCardProps = {
  onPress: () => void;
  label?: string;
  /** Defaults: Ionicons `create-outline`, MaterialCommunityIcons `cards-playing-outline`. */
  icon?: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
  iconFamily?: "ionicons" | "material-community";
  accessibilityLabel?: string;
};

export default function TertiaryCard({
  onPress,
  label = "Custom",
  icon,
  iconFamily = "ionicons",
  accessibilityLabel,
}: TertiaryCardProps) {
  const { theme } = useTheme();
  const styles = createTertiaryCardStyles(theme);

  const resolvedIcon =
    icon ??
    (iconFamily === "material-community"
      ? "cards-playing-outline"
      : "create-outline");

  return (
    <Pressable
      style={({ pressed }) => [
        styles.root,
        pressed && styles.rootPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
    >
      <View style={styles.inner}>
        {iconFamily === "material-community" ? (
          <MaterialCommunityIcons
            name={resolvedIcon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={22}
            color={theme.text}
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
        ) : (
          <Ionicons
            name={resolvedIcon as keyof typeof Ionicons.glyphMap}
            size={20}
            color={theme.text}
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
        )}
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
