import { useEffect } from "react";
import { getSocket } from "./client";
import { C2S, S2C } from "./events";
import { setConnected, setLobbyState } from "../../features/game/gameSlice";

export function useRoomSocket(dispatch, room, playerName) {
  useEffect(() => {
    if (!room || !playerName) return;

    const socket = getSocket();

    const onConnect = () => {
      dispatch(setConnected(true));
      socket.emit(C2S.JOIN, { room, playerName });
    };

    const onDisconnect = () => {
      dispatch(setConnected(false));
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Minimal lobby state listener (your teammate’s server should emit this)
    socket.on(S2C.STATE, (payload) => {
      // Example payload: { players: [...], host: "name" }
      const isHost = payload?.host === playerName;
      dispatch(setLobbyState({ players: payload?.players ?? [], isHost }));
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(S2C.STATE);
    };
  }, [dispatch, room, playerName]);
}
