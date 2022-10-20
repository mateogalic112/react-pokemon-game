import { useMutation, useQueryClient } from 'react-query'
import api from '../base'
import { useGetPokeTrainer } from '../pokeTrainer/useGetPokeTrainer'

interface ICreatePokemonRequest {
  pokemonID: number
  pokeTrainerId: number
}

interface ICreatePokemonResponse {
  id: number
  pokemonID: number
  pokeTrainerId: number
}

const createPokemon = async (
  request: ICreatePokemonRequest
): Promise<ICreatePokemonResponse> => {
  const response = await api.post<ICreatePokemonResponse>('pokemons', request)
  return response.data
}

export const useCreatePokemon = () => {
  const queryClient = useQueryClient()
  const { data: trainer } = useGetPokeTrainer(1)

  return useMutation(
    (request: ICreatePokemonRequest) => createPokemon(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['poke-trainers', trainer.id])
        queryClient.invalidateQueries(['trainer-pokemon', trainer.id])
      },
      onError: (error: Error) => {},
    }
  )
}
