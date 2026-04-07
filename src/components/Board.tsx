import { StyleSheet, View } from 'react-native';
import type { Board as BoardType } from '../game/types';
import { boardOuterSize, CELL_STEP } from './boardLayout';
import { Cell } from './Cell';
import { WinningLine } from './WinningLine';

type Props = {
  board: BoardType;
  onCellPress: (index: number) => void;
  interactive: boolean;
  /** When set, strikethrough-style line is drawn over the winning cells */
  winningLine: readonly [number, number, number] | null;
  gameOver: boolean;
  humanCanMove: boolean;
};

export function Board({
  board,
  onCellPress,
  interactive,
  winningLine,
  gameOver,
  humanCanMove,
}: Props) {
  const winSet = winningLine ? new Set<number>(winningLine) : null;

  const outer = boardOuterSize();

  return (
    <View style={[styles.root, { width: outer }]}>
      <View style={styles.grid}>
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onPress={() => onCellPress(index)}
            disabled={!interactive || value !== null}
            isWinningCell={winSet?.has(index) ?? false}
            emphasizeEmpty={!gameOver && humanCanMove && value === null}
          />
        ))}
      </View>
      <WinningLine line={winningLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    alignSelf: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: CELL_STEP * 3,
  },
});
