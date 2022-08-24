import { createContext, FC, useContext, useReducer } from 'react'
import Pokemon from '../../models/Pokemon'
import PokeTrainer, { IPokeTrainer } from '../../models/PokeTrainer'
import PokeTrainerActionKind from './actions'
import pokeTrainerReducer from './reducer'

export type PokeTrainerState = {
  trainer: IPokeTrainer
  pokeBalls: number
  pokemons: Pokemon[]
}

const initialState: PokeTrainerState = {
  trainer: new PokeTrainer('Mateo', 0),
  pokeBalls: 10,
  pokemons: [],
}

interface IPokeTrainerContext {
  trainer: IPokeTrainer
  pokeBalls: number
  pokemons: Pokemon[]

  catchPokemon: (pokemon: Pokemon, isCaught: boolean) => string
  choosePokemon: (pokemon: Pokemon) => string
}

const initialContext: IPokeTrainerContext = {
  trainer: initialState.trainer,
  pokeBalls: initialState.pokeBalls,
  pokemons: initialState.pokemons,

  catchPokemon: () => '',
  choosePokemon: () => '',
}

const PokeTrainerContext = createContext<IPokeTrainerContext>(initialContext)

export const usePokeTrainerContext = () => {
  const context = useContext(PokeTrainerContext)

  if (!context) {
    throw new Error('Context must be within PokeTrainer.Provider!')
  }

  return context
}

export const PokeTrainerProvider: FC = ({ children }) => {
  const [{ trainer, pokeBalls, pokemons }, dispatch] = useReducer(
    pokeTrainerReducer,
    initialState
  )

  const throwPokeBall = () => {
    if (pokeBalls === 0) return 'You ran out of pokeballs!'

    dispatch({
      type: PokeTrainerActionKind.throwPokeBall,
    })
  }

  const catchPokemon = (pokemon: Pokemon, isCaught: boolean) => {
    throwPokeBall()

    if (isCaught) {
      dispatch({
        type: PokeTrainerActionKind.catchPokemon,
        payload: { pokemon },
      })

      return `You caught ${pokemon.getName()}!`
    }

    return `${pokemon.getName()} escaped!`
  }

  const choosePokemon = (pokemon: Pokemon) => {
    dispatch({
      type: PokeTrainerActionKind.choosePokemon,
      payload: { pokemon },
    })

    return `${pokemon.getName()} is now yours!!`
  }

  return (
    <PokeTrainerContext.Provider
      value={{ trainer, pokeBalls, pokemons, catchPokemon, choosePokemon }}
    >
      {children}
    </PokeTrainerContext.Provider>
  )
}
