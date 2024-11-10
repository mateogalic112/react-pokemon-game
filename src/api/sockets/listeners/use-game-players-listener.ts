import { SocketPlayer } from "@/api/models/socket-api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

interface IGamePlayersListenerProps {
  socket: Socket | null;
}

const useGamePlayersListener = ({ socket }: IGamePlayersListenerProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.on("game_players", (data: { players: Array<SocketPlayer> }) => {
      queryClient.setQueryData(["game_players"], () => [...data.players]);
    });

    return () => {
      socket.off("game_players");
    };
  }, [socket, queryClient]);

  return true;
};

export default useGamePlayersListener;
