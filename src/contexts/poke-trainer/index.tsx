import { createContext, FC, useContext, useEffect, useReducer } from 'react'
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
}

const initialContext: IPokeTrainerContext = {
  trainer: null,

  catchPokemon: async () => '',
}

const PokeTrainerContext = createContext<IPokeTrainerContext>(initialContext)

export const PokeTrainerProvider: FC = ({ children }) => {
  const [{ trainer }, dispatch] = useReducer(pokeTrainerReducer, {
    trainer: null,
  })

  const capturePokemon = useCreatePokemon()
  const updatePokeballs = useUpdatePokeballs()

  const { data: queryTrainer } = useGetPokeTrainer()
  const trainerPokemonResults = useGetTrainerPokemons(queryTrainer)

  const hasFetchedTrainerPokemons = trainerPokemonResults.every(({ data }) =>
    Boolean(data)
  )
  const hasFetchedData = queryTrainer && hasFetchedTrainerPokemons

  useEffect(() => {
    if (!hasFetchedData) return

    const trainerPokemons = queryTrainer.pokemons.map((trainerPokemon) => {
      const fetchedPokemon = trainerPokemonResults.find(
        ({ data }) => data.id === trainerPokemon.pokemonID
      )
      return new Pokemon(
        {
          ...fetchedPokemon.data,
          id: trainerPokemon.id,
        },
        trainerPokemon.hp
      )
    })

    dispatch({
      type: PokeTrainerActionKind.setTrainer,
      payload: {
        trainer: new PokeTrainer(
          queryTrainer.id,
          queryTrainer.name,
          queryTrainer.pokeballs,
          trainerPokemons
        ),
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFetchedData, queryTrainer])

  const catchPokemon = async (pokemon: Pokemon, isCaught: boolean) => {
    const currentPokeballCount = trainer.throwPokeball()
    if (!currentPokeballCount) {
      return 'You ran out of pokeballs!'
    }
    await updatePokeballs.mutateAsync(currentPokeballCount)

    if (isCaught) {
      await capturePokemon.mutateAsync({
        hp: pokemon.hp,
        pokemonID: pokemon.id,
        pokeTrainerId: trainer.id,
      })

      return `You caught ${pokemon.name}!`
    }

    return `${pokemon.name} escaped!`
  }

  return (
    <PokeTrainerContext.Provider value={{ trainer, catchPokemon }}>
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
