import { useQuery } from "@tanstack/react-query";
import { PokeApiPokemon } from "../models/poke-api";
import apiConfig from "@/config/api";

export const getTrainerPokemons = async (trainerId: number): Promise<PokeApiPokemon> => {
  const response = await fetch(`${apiConfig.baseURL}/trainers/${trainerId}/pokemons`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
};

export const useGetTrainerPokemons = (trainerid: number) => {
  return useQuery({
    queryKey: ["trainers", trainerid, "pokemons"],
    queryFn: () => getTrainerPokemons(trainerid)
  });
};
