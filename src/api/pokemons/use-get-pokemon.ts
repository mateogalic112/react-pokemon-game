import { useQueries, useQuery } from "@tanstack/react-query";
import { PokeApiPokemon } from "../models/poke-api";
import apiConfig from "@/config/api";

export const getPokemon = async (pokemonId: number): Promise<PokeApiPokemon> => {
  const response = await fetch(`${apiConfig.pokeApiURL}/pokemon/${pokemonId}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
};

export const useGetInitialPokemons = (pokemonIds: [number, number, number]) => {
  return useQueries({
    queries: pokemonIds.map((id) => {
      return {
        queryKey: ["pokemons", id],
        queryFn: () => getPokemon(id)
      };
    })
  });
};

export const useGetPokemon = (pokemonId: number) =>
  useQuery({
    queryKey: ["pokemons", pokemonId],
    queryFn: () => getPokemon(pokemonId)
  });
