import { PokeTrainerState } from './index'
import { IPokemon } from '../../models/Pokemon'
import PokeTrainerActionKind from './actions'

type PokeTrainerAction =
  | {
      type: PokeTrainerActionKind.catchPokemon
      payload: { pokemon: IPokemon }
    }
  | {
      type: PokeTrainerActionKind.throwPokeBall
    }

export default function (
  state: PokeTrainerState,
  action: PokeTrainerAction,
): PokeTrainerState {
  switch (action.type) {
    case PokeTrainerActionKind.throwPokeBall:
      return {
        ...state,
        pokeBalls: state.pokeBalls - 1,
      }
    case PokeTrainerActionKind.catchPokemon:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload.pokemon],
      }
    default:
      throw new Error('Action not allowed')
  }
}
