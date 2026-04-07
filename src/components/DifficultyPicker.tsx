import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Difficulty } from '../game/types';
import { useAppTheme } from '../theme/ThemeContext';

const OPTIONS: { key: Difficulty; label: string; hint: string }[] = [
  { key: 'easy', label: 'Easy', hint: 'Random valid move' },
  { key: 'medium', label: 'Medium', hint: 'Win, block, then heuristics' },
  { key: 'hard', label: 'Hard', hint: 'Minimax — best play' },
];

type Props = {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
  disabled: boolean;
};

export function DifficultyPicker({ value, onChange, disabled }: Props) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: theme.textLabel }]}>
        CPU difficulty
      </Text>
      <View style={styles.row}>
        {OPTIONS.map((opt) => {
          const active = value === opt.key;
          return (
            <Pressable
              key={opt.key}
              onPress={() => onChange(opt.key)}
              disabled={disabled}
              style={({ pressed }) => [
                styles.chip,
                { backgroundColor: theme.chipBg },
                active && {
                  backgroundColor: theme.difficultyChipActiveBg,
                  borderColor: theme.difficultyChipActiveBorder,
                },
                disabled && styles.chipDisabled,
                pressed && !disabled && styles.chipPressed,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: theme.chipText },
                  active && { color: theme.difficultyChipTextActive },
                ]}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.hint, { color: theme.textSecondary }]}>
        {OPTIONS.find((o) => o.key === value)?.hint}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
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
    fontSize: 14,
    fontWeight: '600',
  },
  hint: {
    marginTop: 8,
    fontSize: 13,
  },
});
