import { inBounds } from "./board";

// Checks if piece at a given position would collide with walls/floor/locked blocks
export function collides(board, piece, nextPos) {
  const { shape } = piece;

  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] === 0) continue;

      const br = nextPos.r + r;
      const bc = nextPos.c + c;

      // outside bounds = collision
      if (!inBounds(br, bc)) return true;

      // locked cell occupied = collision
      if (board[br][bc] !== 0) return true;
    }
  }
  return false;
}
