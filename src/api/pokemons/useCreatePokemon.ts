import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user'
import api from '../base'
import { IPokemonDB } from '../models/PokemonDB'

interface ICreatePokemonRequest {
  hp: number
  pokemonID: number
  pokeTrainerId: number
}

const createPokemon = async (
  request: ICreatePokemonRequest
): Promise<IPokemonDB> => {
  const response = await api.post<IPokemonDB>('pokemons', request)
  return response.data
}

export const useCreatePokemon = () => {
  const queryClient = useQueryClient()
  const user = useSelector(selectUser)
  const trainerId = user.authData?.trainerId

  return useMutation(
    (request: ICreatePokemonRequest) => createPokemon(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['trainers', trainerId])
        queryClient.invalidateQueries(['trainers', 'pokemons', trainerId])
      },
      onError: (error: Error) => {},
    }
  )
}
