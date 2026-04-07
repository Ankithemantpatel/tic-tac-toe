export type Player = 'X' | 'O';
export type CellValue = Player | null;
/** Length-9 row-major: 0–2 top, 3–5 middle, 6–8 bottom */
export type Board = CellValue[];
/** `null` = game in progress */
export type GameResult = Player | 'draw' | null;
export type Difficulty = 'easy' | 'medium' | 'hard';
