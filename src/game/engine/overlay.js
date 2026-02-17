import { inBounds } from "./board";

// Returns a NEW board (does not mutate)
export function overlayPiece(board, piece) {
  if (!piece) return board;

  const { shape, pos } = piece;

  // deep copy rows
  const next = board.map((row) => row.slice());

  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] === 0) continue;

      const br = pos.r + r;
      const bc = pos.c + c;
      if (!inBounds(br, bc)) continue;

      // mark with 1 (later: encode by piece type)
      next[br][bc] = 1;
    }
  }
  return next;
}
