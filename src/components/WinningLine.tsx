import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { getCellCenter } from './boardLayout';

type Props = {
  /** Endpoints use first and third index of the winning triple. */
  line: readonly [number, number, number] | null;
};

const THICKNESS = 5;

export function WinningLine({ line }: Props) {
  const { theme } = useAppTheme();
  const stretch = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (line === null) {
      stretch.setValue(0);
      fade.setValue(0);
      glow.setValue(1);
      return;
    }
    stretch.setValue(0);
    fade.setValue(0);
    glow.setValue(1);

    let cancelled = false;
    const draw = Animated.parallel([
      Animated.spring(stretch, {
        toValue: 1,
        friction: 8,
        tension: 140,
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]);

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 0.82,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 1,
          duration: 550,
          useNativeDriver: true,
        }),
      ])
    );

    draw.start((r) => {
      if (cancelled || !r.finished) return;
      pulse.start();
    });

    return () => {
      cancelled = true;
      draw.stop();
      pulse.stop();
      glow.setValue(1);
    };
  }, [line, stretch, fade, glow]);

  if (line === null) return null;
  if (
    typeof line[0] !== 'number' ||
    typeof line[1] !== 'number' ||
    typeof line[2] !== 'number'
  ) {
    return null;
  }

  const start = getCellCenter(line[0]);
  const end = getCellCenter(line[2]);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: midX - length / 2,
            top: midY - THICKNESS / 2,
            width: length,
            height: THICKNESS,
            opacity: fade,
            transform: [{ rotate: `${angleDeg}deg` }, { scaleX: stretch }],
          },
        ]}
      >
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            borderRadius: THICKNESS / 2,
            backgroundColor: theme.winningLine,
            opacity: glow,
            shadowColor: theme.winningLineShadow,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 4,
          }}
        />
      </Animated.View>
    </View>
  );
}
