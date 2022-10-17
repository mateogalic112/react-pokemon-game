import { useMutation, useQueryClient } from 'react-query'
import { usePokeTrainerContext } from '../../contexts/poke-trainer'
import api from '../base'
import { IPokeTrainerResponse } from './useGetPokeTrainer'

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
  const { trainer } = usePokeTrainerContext()

  return useMutation(
    (pokeballs: number) => updatePokeballs(trainer.id, pokeballs),
    {
      onMutate: async (pokeballs: number) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['poke-trainers', trainer.id])

        // Snapshot the previous value
        const previousTrainer = queryClient.getQueryData([
          'poke-trainers',
          trainer.id,
        ]) as IPokeTrainerResponse

        // Optimistically update to the new value
        const newTrainer = { ...trainer, pokeballs }
        queryClient.setQueryData(['poke-trainers', trainer.id], newTrainer)

        // Return a context with the previous and new todo
        return { previousTrainer, newTrainer }
      },
      onError: (error: Error, newTrainer, context) => {
        queryClient.setQueryData(
          ['poke-trainers', trainer.id],
          context?.previousTrainer
        )
      },
      onSettled: () => {
        queryClient.invalidateQueries(['poke-trainers', trainer.id])
      },
    }
  )
}
