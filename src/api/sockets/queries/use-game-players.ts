import { useQuery } from "@tanstack/react-query";

export const useGamePlayers = () =>
  useQuery({ queryKey: ["game_players"], queryFn: () => Promise.resolve([]), staleTime: Infinity });
