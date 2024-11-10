import { useQueries } from "@tanstack/react-query";
import { getPokemon } from "../pokemons/use-get-pokemon";

export const useGetTrainerPokemons = (trainerId: number, pokemonIds: Array<number>) => {
  return useQueries({
    queries: pokemonIds.map((pokemonId) => {
      return {
        queryKey: ["trainers", trainerId, "pokemons", pokemonId],
        queryFn: () => getPokemon(pokemonId)
      };
    })
  });
};
