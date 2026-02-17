import { inBounds } from "./board";

// Returns NEW board with piece merged (no mutation)
export function lockPiece(board, piece, fillValue = 1) {
  const next = board.map((row) => row.slice());
  const { shape, pos } = piece;

  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] === 0) continue;

      const br = pos.r + r;
      const bc = pos.c + c;
      if (!inBounds(br, bc)) continue;

      next[br][bc] = fillValue;
    }
  }
  return next;
}
