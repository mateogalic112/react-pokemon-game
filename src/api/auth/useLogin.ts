import { useMutation } from 'react-query'
import api from '../base'
import { AuthData } from '../models/AuthData'

interface ILoginRequest {
  email: string
  password: string
}

const loginUser = async (request: ILoginRequest): Promise<AuthData> => {
  const response = await api.post<AuthData>('auth/login', request)
  return response.data
}

export const useLogin = () => {
  // const queryClient = useQueryClient()

  return useMutation((request: ILoginRequest) => loginUser(request), {
    onSuccess: () => {},
    onError: (error: Error) => {},
  })
}
