import { useQuery, UseQueryResult } from 'react-query'
import api from '../base'
import { PokemonAPIData } from '../models/PokemonAPIData'

const fetchIsLoggedIn = async (): Promise<boolean> => {
  return api.get<boolean>(`/auth/isLoggedIn`).then((res) => res.data)
}
export const useIsLoggedIn = (): UseQueryResult<PokemonAPIData> =>
  useQuery(['isLoggedIn'], fetchIsLoggedIn)
