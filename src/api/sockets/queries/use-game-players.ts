import { SocketPlayer } from "@/api/models/socket-api";
import { useQuery } from "@tanstack/react-query";

export const useGamePlayers = () =>
  useQuery({
    queryKey: ["game_players"],
    queryFn: () => Promise.resolve([] as Array<SocketPlayer>),
    staleTime: Infinity
  });
