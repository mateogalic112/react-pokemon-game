import { useQueries, UseQueryResult } from 'react-query'
import { PokemonAPIData } from '../models/PokemonAPIData'
import { fetchInitialPokemon } from '../pokemons/useFetchInitialPokemons'
import { IGetPokeTrainerResponse } from './useGetPokeTrainer'

export const useGetTrainerPokemons = (
  pokeTrainer: IGetPokeTrainerResponse | null
): UseQueryResult<PokemonAPIData>[] => {
  const pokemons = pokeTrainer?.pokemons ?? []
  return useQueries(
    pokemons.map((pokemon) => {
      return {
        queryKey: ['trainer-pokemon', pokeTrainer.id, pokemon.pokemonID],
        queryFn: () => fetchInitialPokemon(pokemon.pokemonID),
        enabled: !!pokeTrainer,
      }
    })
  )
}
