/** Single source of truth for board geometry (must match Cell margin + size). */
export const CELL_SIZE = 88;
export const CELL_MARGIN = 4;
/** Outer step per cell: size + horizontal/vertical margin total */
export const CELL_STEP = CELL_SIZE + CELL_MARGIN * 2;

export function getCellCenter(index: number): { x: number; y: number } {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return {
    x: CELL_MARGIN + col * CELL_STEP + CELL_SIZE / 2,
    y: CELL_MARGIN + row * CELL_STEP + CELL_SIZE / 2,
  };
}

export function boardOuterSize(): number {
  return CELL_STEP * 3;
}
