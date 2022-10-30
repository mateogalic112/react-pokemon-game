import { useMutation, useQueryClient } from 'react-query'
import api from '../base'
import { IPokemonDB } from '../models/PokemonDB'
import { useGetPokeTrainer } from '../pokeTrainer/useGetPokeTrainer'

interface IPatchPokemonHealthRequest {
  id: number
  hp: number
}

const patchPokemonHealth = async (
  request: IPatchPokemonHealthRequest
): Promise<IPokemonDB> => {
  const response = await api.patch<IPokemonDB>(`pokemons/${request.id}`, {
    hp: request.hp,
  })
  return response.data
}

export const usePatchPokemonHealth = () => {
  const queryClient = useQueryClient()
  const { data: trainer } = useGetPokeTrainer()

  return useMutation(
    (request: IPatchPokemonHealthRequest) => patchPokemonHealth(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['trainers', 'pokemons', trainer.id])
      },
      onError: (error: Error) => {},
    }
  )
}
