import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setIdentity, setStatus, initPieces, moveLeft, moveRight, moveDown } from "../features/game/gameSlice";
import { useRoomSocket } from "../lib/socket/useRoomSocket";
import Board from "../components/game/Board";
import { overlayPiece } from "../game/engine/overlay";


export default function RoomPage() {
  const { room, playerName } = useParams();
  const dispatch = useAppDispatch();

  const status = useAppSelector((s) => s.game.status);
  const connected = useAppSelector((s) => s.game.connected);
  const players = useAppSelector((s) => s.game.players);
  const isHost = useAppSelector((s) => s.game.isHost);

const board = useAppSelector((s) => s.game.board) || [];
const currentPiece = useAppSelector((s) => s.game.currentPiece);

 const viewBoard =
  board.length > 0 ? overlayPiece(board, currentPiece) : board;


  useEffect(() => {
    if (!room || !playerName) return;
    dispatch(setIdentity({ room, playerName }));
    dispatch(setStatus("lobby"));
    dispatch(initPieces());
  }, [room, playerName, dispatch]);

  // socket join + listeners
  useRoomSocket(dispatch, room, playerName);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") dispatch(moveLeft());
      if (e.key === "ArrowRight") dispatch(moveRight());
      if (e.key === "ArrowDown") dispatch(moveDown());
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);


  return (
    <div style={{ padding: 16 }}>
      <h1>Red Tetris</h1>
      <p>
        Room: <b>{room}</b> | Player: <b>{playerName}</b>
      </p>
      <p>Status: {status}</p>
      <p>
        Socket: <b>{connected ? "connected" : "disconnected"}</b>
      </p>
      <p>
        Host: <b>{isHost ? "yes" : "no"}</b>
      </p>

      <h3>Players</h3>
      <ul>
        {players.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <h3>Your Board</h3>
      {board.length > 0 ? <Board board={viewBoard} /> : <p>Loading board...</p>}

    </div>
  );
}
