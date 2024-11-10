import apiConfig from '@/config/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface LoginPayload {
  email: string
  password: string
}

const login = async (payload: LoginPayload) => {
  const response = await fetch(`${apiConfig.baseURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return response.json()
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
    onError: (error: Error) => {
      // TODO show toast
    },
  })
}
