import apiConfig from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import { Pokemon } from "../models/api";

interface UpdatePokemonHpPayload {
  id: number;
  hp: number;
}

const updatePokemonHP = async (payload: UpdatePokemonHpPayload): Promise<Pokemon> => {
  const response = await fetch(`${apiConfig.baseURL}/pokemons/${payload.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return response.json();
};

export const usePatchPokemonHealth = () => {
  return useMutation({
    mutationFn: (payload: UpdatePokemonHpPayload) => updatePokemonHP(payload),
    onSuccess: () => {},
    onError: (error: Error) => {}
  });
};
