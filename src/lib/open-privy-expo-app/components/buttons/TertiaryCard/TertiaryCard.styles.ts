import { StyleSheet } from "react-native";
import type { Theme } from "@open-privy-expo-app/theme";

export function createTertiaryCardStyles(theme: Theme) {
  return StyleSheet.create({
    root: {
      flex: 1,
      minWidth: 0,
      paddingVertical: 14,
      paddingHorizontal: 12,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.border,
    },
    rootPressed: {
      opacity: 0.88,
    },
    inner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    label: {
      fontSize: 15,
      fontWeight: "700",
      letterSpacing: 0.2,
      color: theme.text,
    },
  });
}
