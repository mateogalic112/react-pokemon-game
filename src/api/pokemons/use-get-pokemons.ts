import { useQueries } from "@tanstack/react-query";
import { getPokemon } from "./use-get-pokemon";

export const useGetPokemons = (pokemonIds: Array<number>) => {
  return useQueries({
    queries: pokemonIds.map((pokemonId) => {
      return {
        queryKey: ["pokemons", pokemonId],
        queryFn: () => getPokemon(pokemonId)
      };
    })
  });
};
