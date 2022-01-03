import { fetchInitialPokemon } from './useFetchInitialPokemons'
import { useQuery, UseQueryResult } from 'react-query'
import { PokemonAPIData } from '../models/PokemonAPIData'

export const useFetchPokemon = (
  pokemonId: number,
): UseQueryResult<PokemonAPIData> =>
  useQuery(['pokemons', pokemonId], () => fetchInitialPokemon(pokemonId))
