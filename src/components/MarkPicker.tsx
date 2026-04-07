import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Player } from '../game/types';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  humanMark: Player;
  onChangeHumanMark: (p: Player) => void;
  disabled: boolean;
};

export function MarkPicker({ humanMark, onChangeHumanMark, disabled }: Props) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: theme.textLabel }]}>You play as</Text>
      <View style={styles.row}>
        {(['X', 'O'] as const).map((p) => {
          const active = humanMark === p;
          return (
            <Pressable
              key={p}
              onPress={() => onChangeHumanMark(p)}
              disabled={disabled}
              style={({ pressed }) => [
                styles.chip,
                { backgroundColor: theme.chipBg },
                active && {
                  backgroundColor: theme.markChipActiveBg,
                  borderColor: theme.markChipActiveBorder,
                },
                disabled && styles.chipDisabled,
                pressed && !disabled && styles.chipPressed,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: theme.chipText },
                  active && { color: theme.markChipTextActive },
                ]}
              >
                {p} (you)
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.hint, { color: theme.textSecondary }]}>
        X always moves first. If you choose O, the CPU opens as X.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  chipDisabled: {
    opacity: 0.45,
  },
  chipPressed: {
    opacity: 0.85,
  },
  chipText: {
    fontSize: 15,
    fontWeight: '700',
  },
  hint: {
    marginTop: 8,
    fontSize: 13,
  },
});
