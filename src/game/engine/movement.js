import { collides } from "./collision";

export function tryMove(board, piece, dr, dc) {
  if (!piece) return piece;

  const nextPos = { r: piece.pos.r + dr, c: piece.pos.c + dc };
  if (collides(board, piece, nextPos)) return piece;

  return {
    ...piece,
    pos: nextPos,
  };
}
