import { useMutation } from 'react-query'
import api from '../base'
import { AuthData } from '../models/AuthData'

interface IRegisterRequest {
  username: string
  email: string
  password: string
}

const registerUser = async (request: IRegisterRequest): Promise<AuthData> => {
  const response = await api.post<AuthData>('auth/register', request)
  return response.data
}

export const useRegister = () => {
  // const queryClient = useQueryClient()

  return useMutation((request: IRegisterRequest) => registerUser(request), {
    onSuccess: () => {},
    onError: (error: Error) => {},
  })
}
