import { Pressable, StyleSheet, Text } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  onPress: () => void;
  visible: boolean;
};

export function RestartButton({ onPress, visible }: Props) {
  const { theme } = useAppTheme();

  if (!visible) return null;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: theme.restartBg },
        pressed && styles.btnPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Play again"
    >
      <Text style={[styles.btnText, { color: theme.restartText }]}>
        Play again
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  btnPressed: {
    opacity: 0.88,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '700',
  },
});
