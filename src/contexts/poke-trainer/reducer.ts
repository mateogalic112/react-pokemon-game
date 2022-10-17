import { PokeTrainerState } from './index'
import Pokemon from '../../models/Pokemon'
import PokeTrainerActionKind from './actions'
import PokeTrainer from '../../models/PokeTrainer'

type PokeTrainerAction =
  | {
      type: PokeTrainerActionKind.catchPokemon
      payload: { pokemon: Pokemon }
    }
  | {
      type: PokeTrainerActionKind.throwPokeBall
    }
  | {
      type: PokeTrainerActionKind.choosePokemon
      payload: { pokemon: Pokemon }
    }
  | {
      type: PokeTrainerActionKind.setTrainer
      payload: { trainer: PokeTrainer }
    }

const pokeTrainerReducer = (
  state: PokeTrainerState,
  action: PokeTrainerAction
): PokeTrainerState => {
  switch (action.type) {
    case PokeTrainerActionKind.throwPokeBall:
      return {
        ...state,
        trainer: { ...state.trainer, pokeballs: state.trainer.pokeballs - 1 },
      }
    case PokeTrainerActionKind.catchPokemon:
      return {
        ...state,
        trainer: {
          ...state.trainer,
          pokemons: [...state.trainer.pokemons, action.payload.pokemon],
        },
      }
    case PokeTrainerActionKind.choosePokemon:
      return {
        ...state,
        trainer: {
          ...state.trainer,
          pokemons: [...state.trainer.pokemons, action.payload.pokemon],
        },
      }
    case PokeTrainerActionKind.setTrainer:
      return {
        ...state,
        trainer: { ...state.trainer, ...action.payload.trainer },
      }
    default:
      throw new Error('Action not allowed')
  }
}

export default pokeTrainerReducer
