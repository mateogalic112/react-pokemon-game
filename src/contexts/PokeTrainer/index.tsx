import { createContext, FC, useContext, useReducer } from 'react'
import { IPokemon } from '../../models/Pokemon'
import PokeTrainer, { IPokeTrainer } from '../../models/PokeTrainer'
import PokeTrainerActionKind from './actions'
import pokeTrainerReducer from './reducer'

export type PokeTrainerState = {
  trainer: IPokeTrainer
  pokeBalls: number
  pokemons: IPokemon[]
}

const initialState: PokeTrainerState = {
  trainer: new PokeTrainer('Mateo', 0),
  pokeBalls: 10,
  pokemons: [],
}

interface IPokeTrainerContext {
  trainer: IPokeTrainer
  pokeBalls: number
  pokemons: IPokemon[]

  catchPokemon: (pokemon: IPokemon, isCaught: boolean) => string
}

const initialContext: IPokeTrainerContext = {
  trainer: initialState.trainer,
  pokeBalls: initialState.pokeBalls,
  pokemons: initialState.pokemons,

  catchPokemon: () => '',
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
    initialState,
  )

  const throwPokeBall = () => {
    if (pokeBalls === 0) return 'You ran out of pokeballs!'

    dispatch({
      type: PokeTrainerActionKind.throwPokeBall,
    })
  }

  const catchPokemon = (pokemon: IPokemon, isCaught: boolean) => {
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

  return (
    <PokeTrainerContext.Provider
      value={{ trainer, pokeBalls, pokemons, catchPokemon }}
    >
      {children}
    </PokeTrainerContext.Provider>
  )
}
