import type { Board, Difficulty, GameResult, Player } from './types';

export const WIN_LINES: readonly [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function otherPlayer(p: Player): Player {
  return p === 'X' ? 'O' : 'X';
}

export function getWinner(board: Board): Player | null {
  for (const [a, b, c] of WIN_LINES) {
    const v = board[a];
    if (v !== null && v === board[b] && v === board[c]) {
      return v;
    }
  }
  return null;
}

/** Indices of the winning triple when the board has a winner; otherwise `null`. */
export function getWinningLine(board: Board): [number, number, number] | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    const v = board[a];
    if (v !== null && v === board[b] && v === board[c]) {
      return [a, b, c];
    }
  }
  return null;
}

export function isBoardFull(board: Board): boolean {
  return board.every((c) => c !== null);
}

export function getEmptyIndices(board: Board): number[] {
  return board
    .map((c, i) => (c === null ? i : -1))
    .filter((i) => i >= 0);
}

/** Outcome after the board is updated (call with board that already includes the last move). */
export function getResultFromBoard(board: Board): GameResult {
  const w = getWinner(board);
  if (w !== null) return w;
  if (isBoardFull(board)) return 'draw';
  return null;
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function cpuEasy(board: Board): number {
  const empty = getEmptyIndices(board);
  return pickRandom(empty);
}

function cpuMedium(board: Board, cpu: Player, human: Player): number {
  const empty = getEmptyIndices(board);

  for (const i of empty) {
    const next = [...board] as Board;
    next[i] = cpu;
    if (getWinner(next) === cpu) return i;
  }
  for (const i of empty) {
    const next = [...board] as Board;
    next[i] = human;
    if (getWinner(next) === human) return i;
  }
  if (board[4] === null) return 4;
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  if (corners.length > 0) return pickRandom(corners);
  return pickRandom(empty);
}

function minimaxScore(
  board: Board,
  toMove: Player,
  cpu: Player,
  human: Player
): number {
  const w = getWinner(board);
  if (w === cpu) return 1;
  if (w === human) return -1;
  if (isBoardFull(board)) return 0;

  const empty = getEmptyIndices(board);
  if (toMove === cpu) {
    let best = -2;
    for (const i of empty) {
      const next = [...board] as Board;
      next[i] = cpu;
      best = Math.max(best, minimaxScore(next, human, cpu, human));
    }
    return best;
  }
  let best = 2;
  for (const i of empty) {
    const next = [...board] as Board;
    next[i] = human;
    best = Math.min(best, minimaxScore(next, cpu, cpu, human));
  }
  return best;
}

function cpuHard(board: Board, cpu: Player, human: Player): number {
  const empty = getEmptyIndices(board);
  let bestScore = -Infinity;
  const candidates: number[] = [];
  for (const i of empty) {
    const next = [...board] as Board;
    next[i] = cpu;
    const score = minimaxScore(next, human, cpu, human);
    if (score > bestScore) {
      bestScore = score;
      candidates.length = 0;
      candidates.push(i);
    } else if (score === bestScore) {
      candidates.push(i);
    }
  }
  return pickRandom(candidates);
}

type CpuStrategy = (board: Board, cpu: Player, human: Player) => number;

const STRATEGIES: Record<Difficulty, CpuStrategy> = {
  easy: (board) => cpuEasy(board),
  medium: (board, cpu, human) => cpuMedium(board, cpu, human),
  hard: (board, cpu, human) => cpuHard(board, cpu, human),
};

export function getCpuMove(
  board: Board,
  cpu: Player,
  human: Player,
  difficulty: Difficulty
): number {
  const empty = getEmptyIndices(board);
  if (empty.length === 0) {
    throw new Error('getCpuMove: no empty cells');
  }
  const move = STRATEGIES[difficulty](board, cpu, human);
  if (board[move] !== null) {
    return pickRandom(empty);
  }
  return move;
}
