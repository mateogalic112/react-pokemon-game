import { useQuery } from 'react-query'
import api from '../base'

interface IPokemonDB {
  id: number
  hp: number
  pokemonID: number
  pokeTrainerId: number
}

export interface IGetPokeTrainerResponse {
  id: number
  name: string
  pokeballs: number
  pokemons: IPokemonDB[]
}

const getPokeTrainer = async (
  trainerId: number
): Promise<IGetPokeTrainerResponse> => {
  const response = await api.get<IGetPokeTrainerResponse>(
    `poke-trainers/${trainerId}`
  )
  return response.data
}

export const useGetPokeTrainer = (trainerId: number) => {
  return useQuery(['poke-trainers', trainerId], () => getPokeTrainer(trainerId))
}
