import { createContext, FC, useContext, useReducer } from 'react'
import { useCreatePokemon } from '../../api/pokemons/useCreatePokemon'
import { useGetPokeTrainer } from '../../api/pokeTrainer/useGetPokeTrainer'
import { useGetTrainerPokemons } from '../../api/pokeTrainer/useGetTrainerPokemons'
import { useUpdatePokeballs } from '../../api/pokeTrainer/useUpdatePokeballs'
import Pokemon from '../../models/Pokemon'
import PokeTrainer from '../../models/PokeTrainer'
import PokeTrainerActionKind from './actions'
import pokeTrainerReducer from './reducer'

export type PokeTrainerState = {
  trainer: PokeTrainer | null
}

interface IPokeTrainerContext {
  trainer: PokeTrainer | null

  catchPokemon: (pokemon: Pokemon, isCaught: boolean) => Promise<string>
  choosePokemon: (pokemon: Pokemon) => string
}

const initialContext: IPokeTrainerContext = {
  trainer: null,

  catchPokemon: async () => '',
  choosePokemon: () => '',
}

const PokeTrainerContext = createContext<IPokeTrainerContext>(initialContext)

export const PokeTrainerProvider: FC = ({ children }) => {
  const capturePokemon = useCreatePokemon()
  const updatePokeballs = useUpdatePokeballs()

  const { data: queryTrainer } = useGetPokeTrainer(1)
  const trainerPokemonResults = useGetTrainerPokemons(queryTrainer)

  const hasFetchedTrainerPokemons = trainerPokemonResults.every(({ data }) =>
    Boolean(data)
  )
  const hasFetchedData = queryTrainer && hasFetchedTrainerPokemons

  const createTrainerPokemons = () => {
    if (!hasFetchedData) return []
    return trainerPokemonResults.map(
      ({ data }) =>
        new Pokemon(
          data,
          queryTrainer.pokemons.find((p) => p.pokemonID === data.id)?.hp
        )
    )
  }

  const [{ trainer }, dispatch] = useReducer(pokeTrainerReducer, {
    trainer: hasFetchedData
      ? new PokeTrainer(
          queryTrainer.id,
          queryTrainer.name,
          queryTrainer.pokeballs,
          createTrainerPokemons()
        )
      : null,
  })

  const throwPokeBall = async () => {
    if (trainer.pokeballs === 0) return 'You ran out of pokeballs!'
    await updatePokeballs.mutateAsync(trainer.pokeballs - 1)
  }

  const catchPokemon = async (pokemon: Pokemon, isCaught: boolean) => {
    throwPokeBall()

    if (isCaught) {
      dispatch({
        type: PokeTrainerActionKind.catchPokemon,
        payload: { pokemon },
      })

      const createdPokemon = await capturePokemon.mutateAsync({
        pokemonID: pokemon.id,
        pokeTrainerId: 1,
      })

      console.log({ createdPokemon })

      return `You caught ${pokemon.name}!`
    }

    return `${pokemon.name} escaped!`
  }

  const choosePokemon = (pokemon: Pokemon) => {
    dispatch({
      type: PokeTrainerActionKind.choosePokemon,
      payload: { pokemon },
    })

    return `${pokemon.name} is now yours!!`
  }

  return (
    <PokeTrainerContext.Provider
      value={{ trainer, catchPokemon, choosePokemon }}
    >
      {children}
    </PokeTrainerContext.Provider>
  )
}

export const usePokeTrainerContext = () => {
  const context = useContext(PokeTrainerContext)

  if (!context) {
    throw new Error('Context must be within PokeTrainer.Provider!')
  }

  return context
}
