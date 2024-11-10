import apiConfig from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import { Pokemon } from "../models/api";

interface CreatePokemonPayload {
  pokemon_id: number;
  hp: number;
  trainer_id: number;
}

const createPokemon = async (payload: CreatePokemonPayload): Promise<Pokemon> => {
  const response = await fetch(`${apiConfig.baseURL}/pokemons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return response.json();
};

export const useCreatePokemon = () => {
  return useMutation({
    mutationFn: (payload: CreatePokemonPayload) => createPokemon(payload),
    onSuccess: () => {},
    onError: (error: Error) => {
      // TODO show toast
    }
  });
};
