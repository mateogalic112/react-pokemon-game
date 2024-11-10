import { PokeTrainer } from "@/models/PokeTrainer";
import { useGetMe } from "../auth/use-get-me";
import { useGetTrainerPokemons } from "./use-get-trainer-pokemons";
import { useGetPokemons } from "../pokemons/use-get-pokemons";
import { Pokemon } from "@/models/Pokemon";

export const useGetPokeTrainer = () => {
  const { data: me } = useGetMe();

  const trainerId = me?.id as number;

  const { data: pokemons } = useGetTrainerPokemons(trainerId);

  const pokemonIds = pokemons?.map((pokemon) => pokemon.id) ?? [];

  const pokeApiPokemonResults = useGetPokemons(pokemonIds);

  const pokeApiPokemons = pokeApiPokemonResults.map((result) => result.data);

  if (!me || !pokeApiPokemons.every(Boolean)) return null;

  return new PokeTrainer(
    me.id,
    me.name,
    me.pokeballs,
    pokeApiPokemons.reduce((acc, pokemon) => {
      if (pokemon) {
        acc.push(new Pokemon(pokemon));
      }
      return acc;
    }, [] as Pokemon[])
  );
};
