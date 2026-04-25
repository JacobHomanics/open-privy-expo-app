import { useMemo } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { useTheme } from "@open-privy-expo-app/theme";

export type PhoneEmailTabValue = 'phoneNumber' | 'email';

type Props = {
    value: PhoneEmailTabValue;
    onChange: (value: PhoneEmailTabValue) => void;
};

export default function PhoneEmailTabs({ value, onChange }: Props) {
    const { theme } = useTheme();
    const styles = useMemo(
        () =>
            StyleSheet.create({
                tabRow: {
                    flexDirection: 'row',
                    backgroundColor: theme.border,
                    borderRadius: 10,
                    padding: 4,
                    marginHorizontal: 24,
                    marginTop: 24,
                },
                tab: {
                    flex: 1,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                tabActive: {
                    backgroundColor: theme.primary,
                },
                tabText: {
                    fontSize: 16,
                    fontWeight: '600',
                    color: theme.text,
                },
                tabTextActive: {
                    color: theme.primaryContrast,
                },
            }),
        [theme]
    );

    return (
        <View style={styles.tabRow}>
            <Pressable
                style={({ pressed }) => [
                    styles.tab,
                    value === 'phoneNumber' && styles.tabActive,
                    pressed && { opacity: 0.8 },
                ]}
                onPress={() => onChange('phoneNumber')}
            >
                <Text
                    style={[
                        styles.tabText,
                        value === 'phoneNumber' && styles.tabTextActive,
                    ]}
                >
                    Phone Number
                </Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    styles.tab,
                    value === 'email' && styles.tabActive,
                    pressed && { opacity: 0.8 },
                ]}
                onPress={() => onChange('email')}
            >
                <Text
                    style={[
                        styles.tabText,
                        value === 'email' && styles.tabTextActive,
                    ]}
                >
                    Email
                </Text>
            </Pressable>
        </View>
    );
}
