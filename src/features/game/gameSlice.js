import { createSlice } from "@reduxjs/toolkit";
import { createEmptyBoard } from "../../game/engine/board";
import { tryMove } from "../../game/engine/movement";
import { createPiece, randomPieceKey } from "../../game/engine/pieces";
import { collides } from "../../game/engine/collision";
import { lockPiece } from "../../game/engine/lock";
import { clearFullLines } from "../../game/engine/lineClear";


const initialState = {
  room: null,
  playerName: null,
  isHost: false,
  status: "idle", // idle | lobby | playing | gameover

  connected: false,
  players: [],

  board: createEmptyBoard(),
  currentPiece: null,
  nextPiece: null,
  opponents: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIdentity(state, action) {
      state.room = action.payload.room;
      state.playerName = action.payload.playerName;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setConnected(state, action) {
      state.connected = action.payload;
    },
    setLobbyState(state, action) {
      // expect { players: [], isHost: boolean }
      state.players = action.payload.players ?? state.players;
      state.isHost = !!action.payload.isHost;
    },
    resetBoard(state) {
      state.board = createEmptyBoard();
    },
    moveLeft(state) {
      if (!state.currentPiece) return;
      state.currentPiece = tryMove(state.board, state.currentPiece, 0, -1);
    },
    moveRight(state) {
      if (!state.currentPiece) return;
      state.currentPiece = tryMove(state.board, state.currentPiece, 0, 1);
    },
    initPieces(state) {
      const nextKey = randomPieceKey();
      state.currentPiece = createPiece(nextKey);
      state.nextPiece = createPiece(randomPieceKey());
    },

    spawnNextPiece(state) {
      if (!state.nextPiece) {
        state.currentPiece = createPiece(randomPieceKey());
        state.nextPiece = createPiece(randomPieceKey());
        return;
      }
      state.currentPiece = state.nextPiece;
      state.currentPiece.pos = { r: 0, c: 3 }; // reset spawn position
      state.nextPiece = createPiece(randomPieceKey());

      // Game over if new piece collides immediately
      if (collides(state.board, state.currentPiece, state.currentPiece.pos)) {
        state.status = "gameover";
      }
    },

    // Replace moveDown with "move down OR lock"
    moveDown(state) {
      if (!state.currentPiece || state.status === "gameover") return;

      const nextPos = { r: state.currentPiece.pos.r + 1, c: state.currentPiece.pos.c };

      if (!collides(state.board, state.currentPiece, nextPos)) {
        state.currentPiece.pos = nextPos;
        return;
      }

      // Can't move down -> LOCK
      state.board = lockPiece(state.board, state.currentPiece, 1);

      // Clear lines
      const result = clearFullLines(state.board);
      state.board = result.board;

      // Spawn next
      // (Note: penalty logic will come later with server)
      state.currentPiece = null;
      // call spawnNextPiece behavior inline:
      if (!state.nextPiece) {
        state.currentPiece = createPiece(randomPieceKey());
        state.nextPiece = createPiece(randomPieceKey());
      } else {
        state.currentPiece = state.nextPiece;
        state.currentPiece.pos = { r: 0, c: 3 };
        state.nextPiece = createPiece(randomPieceKey());
      }

      // Check gameover after spawn
      if (collides(state.board, state.currentPiece, state.currentPiece.pos)) {
        state.status = "gameover";
      }
    },


  },
});

export const {
  setIdentity,
  setStatus,
  setConnected,
  setLobbyState,
  resetBoard,
  moveLeft,
  moveRight,
  moveDown,
  initPieces,
  spawnNextPiece
} = gameSlice.actions;

export default gameSlice.reducer;
