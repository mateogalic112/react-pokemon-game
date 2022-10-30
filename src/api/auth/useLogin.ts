import { useMutation } from 'react-query'
import api from '../base'
import { AuthData } from '../models/AuthData'
import { useDispatch } from 'react-redux'
import { auth } from '../../redux/user'
interface ILoginRequest {
  email: string
  password: string
}

const loginUser = async (request: ILoginRequest): Promise<AuthData> => {
  const response = await api.post<AuthData>('auth/login', request, {
    withCredentials: false,
  })
  return response.data
}

export const useLogin = () => {
  // const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation((request: ILoginRequest) => loginUser(request), {
    onSuccess: (data: AuthData) => {
      dispatch(auth(data))
    },
    onError: (error: Error) => {},
  })
}
