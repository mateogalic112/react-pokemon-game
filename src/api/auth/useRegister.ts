import { useMutation, useQueryClient } from 'react-query'
import api from '../base'
import { AuthData } from '../models/AuthData'
import { useDispatch } from 'react-redux'
import { auth } from '../../redux/user'

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
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation((request: IRegisterRequest) => registerUser(request), {
    onSuccess: (data: AuthData) => {
      dispatch(auth(data))
      queryClient.invalidateQueries(['isLoggedIn'])
    },
    onError: (error: Error) => {},
  })
}
