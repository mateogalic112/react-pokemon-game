import { useMutation, useQueryClient } from 'react-query'
import api from '../base'
import { IPokeTrainerResponse, useGetPokeTrainer } from './useGetPokeTrainer'

const updatePokeballs = async (
  trainerId: number,
  pokeballs: number
): Promise<IPokeTrainerResponse> => {
  const response = await api.patch<IPokeTrainerResponse>(
    `poke-trainers/${trainerId}`,
    { pokeballs }
  )
  return response.data
}

export const useUpdatePokeballs = () => {
  const queryClient = useQueryClient()
  const { data: trainer } = useGetPokeTrainer()

  return useMutation(
    (pokeballs: number) => updatePokeballs(trainer.id, pokeballs),
    {
      onMutate: async (pokeballs: number) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['trainers', trainer.id])

        // Snapshot the previous value
        const previousTrainer = queryClient.getQueryData([
          'trainers',
          trainer.id,
        ]) as IPokeTrainerResponse

        // Optimistically update to the new value
        const newTrainer = { ...trainer, pokeballs }
        queryClient.setQueryData(['trainers', trainer.id], newTrainer)

        // Return a context with the previous and new todo
        return { previousTrainer, newTrainer }
      },
      onError: (error: Error, newTrainer, context) => {
        queryClient.setQueryData(
          ['trainers', trainer.id],
          context?.previousTrainer
        )
      },
      onSettled: () => {
        queryClient.invalidateQueries(['trainers', trainer.id])
      },
    }
  )
}
