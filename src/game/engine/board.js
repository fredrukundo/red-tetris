import { COLS, ROWS, EMPTY } from "../constants";

export function createEmptyBoard() {
  // 20 rows x 10 cols
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => EMPTY)
  );
}

// Safe read helper
export function inBounds(r, c) {
  return r >= 0 && r < ROWS && c >= 0 && c < COLS;
}
