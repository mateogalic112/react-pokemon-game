import { useQuery, UseQueryResult } from 'react-query'

export const useFetchGamePlayers = (): UseQueryResult<any> =>
  useQuery(['game_players'], () => Promise.resolve([]), { staleTime: Infinity })
