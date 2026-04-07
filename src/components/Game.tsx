import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  getCpuMove,
  getResultFromBoard,
  getWinningLine,
  otherPlayer,
} from '../game/logic';
import type { Board, Difficulty, GameResult, Player } from '../game/types';
import { useAppTheme } from '../theme/ThemeContext';
import { Board as BoardView } from './Board';
import { DifficultyPicker } from './DifficultyPicker';
import { GameStatus } from './GameStatus';
import { MarkPicker } from './MarkPicker';
import { RestartButton } from './RestartButton';
import { ThemeToggle } from './ThemeToggle';

const CPU_DELAY_MS = 450;

function emptyBoard(): Board {
  return [null, null, null, null, null, null, null, null, null];
}

export function Game() {
  const { theme } = useAppTheme();
  const [board, setBoard] = useState<Board>(() => emptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [result, setResult] = useState<GameResult>(null);
  const [humanMark, setHumanMark] = useState<Player>('X');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const cpuMark = useMemo(() => otherPlayer(humanMark), [humanMark]);

  const boardRef = useRef(board);
  const currentPlayerRef = useRef(currentPlayer);
  const resultRef = useRef(result);
  boardRef.current = board;
  currentPlayerRef.current = currentPlayer;
  resultRef.current = result;

  const settingsLocked =
    board.some((c) => c !== null) && result === null;

  const restart = useCallback(() => {
    setBoard(emptyBoard());
    setResult(null);
    setCurrentPlayer('X');
  }, []);

  const handleCellPress = useCallback(
    (index: number) => {
      if (result !== null) return;
      if (currentPlayer !== humanMark) return;
      if (board[index] !== null) return;

      const next = [...board] as Board;
      next[index] = humanMark;
      const r = getResultFromBoard(next);
      setBoard(next);
      if (r !== null) {
        setResult(r);
      } else {
        setCurrentPlayer(otherPlayer(humanMark));
      }
    },
    [board, currentPlayer, humanMark, result]
  );

  useEffect(() => {
    if (result !== null) return;
    if (currentPlayer !== cpuMark) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      if (resultRef.current !== null) return;
      if (currentPlayerRef.current !== cpuMark) return;

      const prev = boardRef.current;
      const idx = getCpuMove(prev, cpuMark, humanMark, difficulty);
      const next = [...prev] as Board;
      next[idx] = cpuMark;
      const r = getResultFromBoard(next);

      setBoard(next);
      if (r !== null) {
        setResult(r);
      } else {
        setCurrentPlayer(humanMark);
      }
    }, CPU_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [currentPlayer, cpuMark, humanMark, difficulty, result]);

  const humanCanMove = result === null && currentPlayer === humanMark;

  const winningLine = useMemo(() => {
    if (result !== 'X' && result !== 'O') return null;
    return getWinningLine(board);
  }, [board, result]);

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={[
        styles.scroll,
        { backgroundColor: theme.background },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.inner}>
        <Text style={[styles.heading, { color: theme.textPrimary }]}>
          Tic Tac Toe
        </Text>
        <Text style={[styles.tagline, { color: theme.textSecondary }]}>
          You vs CPU
        </Text>

        <ThemeToggle />

        <GameStatus
          result={result}
          currentPlayer={currentPlayer}
          humanMark={humanMark}
        />

        <BoardView
          board={board}
          onCellPress={handleCellPress}
          interactive={humanCanMove}
          winningLine={winningLine}
          gameOver={result !== null}
          humanCanMove={humanCanMove}
        />

        <RestartButton onPress={restart} visible={result !== null} />

        <DifficultyPicker
          value={difficulty}
          onChange={setDifficulty}
          disabled={settingsLocked}
        />
        <MarkPicker
          humanMark={humanMark}
          onChangeHumanMark={setHumanMark}
          disabled={settingsLocked}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingTop: Platform.select({ ios: 56, android: 40, default: 32 }),
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  inner: {
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  tagline: {
    marginTop: 6,
    fontSize: 16,
    textAlign: 'center',
  },
});
