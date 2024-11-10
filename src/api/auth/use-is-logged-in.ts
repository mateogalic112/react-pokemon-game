import { useQuery } from "@tanstack/react-query";
import apiConfig from "@/config/api";

const fetchMe = async () => {
  const response = await fetch(`${apiConfig.baseURL}/auth/me`, {
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
};
export const useIsLoggedIn = () =>
  useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
