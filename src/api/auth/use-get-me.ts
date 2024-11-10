import { useQuery } from "@tanstack/react-query";
import apiConfig from "@/config/api";
import { ApiTrainer } from "../models/api";

const fetchMe = async (): Promise<ApiTrainer> => {
  const response = await fetch(`${apiConfig.baseURL}/auth/me`, {
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
};

export const useGetMe = () =>
  useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
