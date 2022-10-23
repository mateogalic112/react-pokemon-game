import { useQuery } from 'react-query'
import api from '../base'

interface IPokemonDB {
  id: number
  hp: number
  pokemonID: number
  pokeTrainerId: number
}

export interface IPokeTrainerResponse {
  id: number
  name: string
  pokeballs: number
  pokemons: IPokemonDB[]
}

const getPokeTrainer = async (
  trainerId: number
): Promise<IPokeTrainerResponse> => {
  const response = await api.get<IPokeTrainerResponse>(
    `poke-trainers/${trainerId}`
  )
  return response.data
}

export const useGetPokeTrainer = (trainerId: number) => {
  return useQuery(['trainers', trainerId], () => getPokeTrainer(trainerId))
}
