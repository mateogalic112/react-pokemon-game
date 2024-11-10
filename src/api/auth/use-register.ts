import apiConfig from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

const register = async (payload: RegisterPayload) => {
  const response = await fetch(`${apiConfig.baseURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return response.json();
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error: Error) => {
      // TODO show toast
    }
  });
};
