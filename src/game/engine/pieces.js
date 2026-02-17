// 1 = filled, 0 = empty (piece-local matrix)
export const TETROMINOS = {
  I: [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0],
  ],
  O: [
    [1,1],
    [1,1],
  ],
  T: [
    [0,1,0],
    [1,1,1],
    [0,0,0],
  ],
  S: [
    [0,1,1],
    [1,1,0],
    [0,0,0],
  ],
  Z: [
    [1,1,0],
    [0,1,1],
    [0,0,0],
  ],
  J: [
    [1,0,0],
    [1,1,1],
    [0,0,0],
  ],
  L: [
    [0,0,1],
    [1,1,1],
    [0,0,0],
  ],
};

export const PIECE_KEYS = Object.keys(TETROMINOS);

// simple random (server will later provide deterministic sequence)
export function randomPieceKey() {
  return PIECE_KEYS[Math.floor(Math.random() * PIECE_KEYS.length)];
}

export function createPiece(key) {
  return {
    key,
    shape: TETROMINOS[key],
    // spawn near top-center
    pos: { r: 0, c: 3 },
  };
}
