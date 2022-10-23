import { useQuery, UseQueryResult } from 'react-query'
import { Player } from '../models/Player'

export const useFetchGamePlayers = (): UseQueryResult<Player[]> =>
  useQuery(['game_players'], () => Promise.resolve([]), { staleTime: Infinity })
