import { useQueries, UseQueryResult } from 'react-query'
import axiosInstance from '../../utils/axiosInstance'
import { PokemonAPIData } from '../models/PokemonAPIData'

export const fetchInitialPokemon = async (
  pokemonId: number
): Promise<PokemonAPIData> => {
  return axiosInstance
    .get<PokemonAPIData>(`/pokemon/${pokemonId}`)
    .then((res) => res.data)
}

export const useFetchInitialPokemons = (
  pokemonIds: [number, number, number]
): UseQueryResult<PokemonAPIData>[] => {
  return useQueries(
    pokemonIds.map((id) => {
      return {
        queryKey: ['pokemon', id],
        queryFn: () => fetchInitialPokemon(id),
      }
    })
  )
}
