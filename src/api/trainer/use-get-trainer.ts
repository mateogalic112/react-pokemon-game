import apiConfig from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { Trainer } from "../models/api";

const getTrainer = async (trainerId: number): Promise<Trainer> => {
  const response = await fetch(`${apiConfig.baseURL}/trainers/${trainerId}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
};

export const useGetTrainer = (trainerId: number) => {
  return useQuery({
    queryKey: ["trainers", trainerId],
    queryFn: () => getTrainer(trainerId)
  });
};
