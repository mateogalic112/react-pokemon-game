import { useQuery } from '@tanstack/react-query'
import apiConfig from '@/config/api'

const fetchMe = async () => {
  return fetch(`${apiConfig.baseURL}/auth/me`, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export const useIsLoggedIn = () =>
  useQuery({
    queryKey: ['auth', 'me'],
    queryFn: fetchMe,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
