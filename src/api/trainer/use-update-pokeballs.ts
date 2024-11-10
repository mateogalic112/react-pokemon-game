import apiConfig from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trainer } from "../models/api";

const updatePokeballs = async (trainerId: number, pokeballs: number): Promise<Trainer> => {
  const response = await fetch(`${apiConfig.baseURL}/pokemons/${trainerId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pokeballs })
  });
  return response.json();
};

export const useUpdatePokeballs = (trainerId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pokeballs: number) => updatePokeballs(trainerId, pokeballs),
    onMutate: async (pokeballs: number) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["trainers", trainerId] });

      // Snapshot the previous value
      const previousTrainer = queryClient.getQueryData(["trainers", trainerId]);

      // Optimistically update to the new value
      queryClient.setQueryData(["trainers", trainerId], (old: Trainer) => ({
        ...old,
        pokeballs
      }));

      // Return a context with the previous and new todo
      return { previousTrainer };
    },
    onError: (error: Error, _, context) => {
      queryClient.setQueryData(["trainers", trainerId], context?.previousTrainer);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trainers", trainerId] });
    }
  });
};
