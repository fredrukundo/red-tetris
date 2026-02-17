import { COLS, EMPTY } from "../constants";

export function clearFullLines(board) {
  const isFull = (row) => row.every((cell) => cell !== EMPTY);

  const remaining = board.filter((row) => !isFull(row));
  const clearedCount = board.length - remaining.length;

  const emptyRow = Array.from({ length: COLS }, () => EMPTY);
  const newRows = Array.from({ length: clearedCount }, () => emptyRow.slice());

  return {
    board: [...newRows, ...remaining],
    cleared: clearedCount,
  };
}
