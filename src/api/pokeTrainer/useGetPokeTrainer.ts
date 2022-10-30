import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user'
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

export const useGetPokeTrainer = () => {
  const user = useSelector(selectUser)
  const trainerId = user.authData?.trainerId
  return useQuery(['trainers', trainerId], () => getPokeTrainer(trainerId), {
    enabled: !!trainerId,
  })
}
