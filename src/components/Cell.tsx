import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import type { CellValue } from '../game/types';
import { useAppTheme } from '../theme/ThemeContext';
import { CELL_MARGIN, CELL_SIZE } from './boardLayout';

type Props = {
  value: CellValue;
  onPress: () => void;
  disabled: boolean;
  isWinningCell?: boolean;
  /** Softer emphasis on empty cells when it’s the human’s turn */
  emphasizeEmpty?: boolean;
};

export function Cell({
  value,
  onPress,
  disabled,
  isWinningCell = false,
  emphasizeEmpty = false,
}: Props) {
  const { theme } = useAppTheme();
  const pressScale = useRef(new Animated.Value(1)).current;
  const winScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isWinningCell || value === null) {
      winScale.stopAnimation();
      winScale.setValue(1);
      return;
    }

    let cancelled = false;
    winScale.setValue(1);

    // JS driver: avoids iOS native animated issues with transform `scale` in some RN versions.
    const intro = Animated.sequence([
      Animated.spring(winScale, {
        toValue: 1.12,
        friction: 5,
        tension: 220,
        useNativeDriver: false,
      }),
      Animated.spring(winScale, {
        toValue: 1,
        friction: 6,
        tension: 160,
        useNativeDriver: false,
      }),
    ]);

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(winScale, {
          toValue: 1.06,
          duration: 520,
          useNativeDriver: false,
        }),
        Animated.timing(winScale, {
          toValue: 1,
          duration: 520,
          useNativeDriver: false,
        }),
      ])
    );

    intro.start((r) => {
      if (cancelled || !r.finished) return;
      pulse.start();
    });

    return () => {
      cancelled = true;
      intro.stop();
      pulse.stop();
      winScale.setValue(1);
    };
  }, [isWinningCell, value, winScale]);

  const bounce = () => {
    Animated.sequence([
      Animated.timing(pressScale, {
        toValue: 0.94,
        duration: 75,
        useNativeDriver: false,
      }),
      Animated.spring(pressScale, {
        toValue: 1,
        friction: 4,
        tension: 340,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const label = value === null ? '' : value;
  const dimmed = disabled && !(isWinningCell && value !== null);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => {
        if (!disabled) bounce();
      }}
      style={({ pressed }) => [
        styles.wrap,
        dimmed && styles.wrapDimmed,
        pressed && !disabled && styles.wrapPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={value === null ? 'Empty cell' : `Cell ${value}`}
    >
      <Animated.View
        style={[
          styles.cell,
          {
            backgroundColor: theme.cellBg,
            borderColor: theme.cellBorder,
          },
          isWinningCell &&
            value !== null && {
              backgroundColor: theme.cellWinningBg,
              borderColor: theme.cellWinningBorder,
            },
          emphasizeEmpty &&
            value === null && {
              borderColor: theme.cellEmphasisBorder,
              backgroundColor: theme.cellEmphasisBg,
            },
          { transform: [{ scale: pressScale }] },
        ]}
      >
        <Animated.View
          style={[
            styles.cellInner,
            { transform: [{ scale: winScale }] },
          ]}
        >
          <Text style={[styles.mark, { color: theme.mark }]}>{label}</Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: CELL_SIZE + CELL_MARGIN * 2,
    height: CELL_SIZE + CELL_MARGIN * 2,
    padding: CELL_MARGIN,
  },
  wrapDimmed: {
    opacity: 0.55,
  },
  wrapPressed: {
    opacity: 0.92,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 12,
    borderWidth: 2,
  },
  cellInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: {
    fontSize: 44,
    fontWeight: '700',
  },
});
