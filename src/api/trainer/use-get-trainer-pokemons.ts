import { useQuery } from "@tanstack/react-query";
import apiConfig from "@/config/api";
import { Pokemon } from "../models/api";

export const getTrainerPokemons = async (trainerId: number): Promise<Array<Pokemon>> => {
  const response = await fetch(`${apiConfig.baseURL}/trainers/${trainerId}/pokemons`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
};

export const useGetTrainerPokemons = (trainerId: number) => {
  return useQuery({
    queryKey: ["trainers", trainerId, "pokemons"],
    queryFn: () => getTrainerPokemons(trainerId),
    enabled: !!trainerId
  });
};
