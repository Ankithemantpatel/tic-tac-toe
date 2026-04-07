import { StyleSheet, Text, View } from 'react-native';
import type { GameResult, Player } from '../game/types';
import { otherPlayer } from '../game/logic';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  result: GameResult;
  currentPlayer: Player;
  humanMark: Player;
};

export function GameStatus({ result, currentPlayer, humanMark }: Props) {
  const { theme } = useAppTheme();
  const cpuMark = otherPlayer(humanMark);

  if (result === 'draw') {
    return (
      <View style={styles.wrap}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Draw</Text>
        <Text style={[styles.sub, { color: theme.textBody }]}>
          No more moves — it’s a tie.
        </Text>
      </View>
    );
  }

  if (result !== null) {
    const youWon = result === humanMark;
    return (
      <View style={styles.wrap}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          {youWon ? '🎉🎊You win' : 'CPU wins'}
        </Text>
        <Text style={[styles.sub, { color: theme.textBody }]}>
          {result} took the line. You play as {humanMark}, CPU as {cpuMark}.
        </Text>
      </View>
    );
  }

  const yourTurn = currentPlayer === humanMark;
  return (
    <View style={styles.wrap}>
      <View style={styles.turnRow}>
        {(['X', 'O'] as const).map((p) => {
          const active = currentPlayer === p;
          return (
            <View
              key={p}
              style={[
                styles.turnChip,
                { backgroundColor: theme.turnChipBg, shadowColor: theme.turnChipShadow },
                active && {
                  backgroundColor: theme.turnChipActiveBg,
                  borderColor: theme.turnChipActiveBorder,
                  transform: [{ scale: 1.06 }],
                  shadowOpacity: theme.mode === 'dark' ? 0.35 : 0.12,
                  shadowRadius: 8,
                  elevation: 4,
                },
              ]}
              accessibilityLabel={
                active ? `${p} — current turn` : `${p} — waiting`
              }
            >
              <Text
                style={[
                  styles.turnChipText,
                  { color: theme.turnChipText },
                  active && { color: theme.turnChipTextActive },
                ]}
              >
                {p}
              </Text>
            </View>
          );
        })}
      </View>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        {yourTurn ? 'Your turn' : 'CPU is thinking…'}
      </Text>
      <Text style={[styles.sub, { color: theme.textBody }]}>
        You are {humanMark}. Next move: {currentPlayer}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 72,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  turnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    marginBottom: 10,
  },
  turnChip: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  turnChipText: {
    fontSize: 26,
    fontWeight: '800',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  sub: {
    marginTop: 6,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
