import { PokeTrainerState } from '.'
import { IPokemon } from '../../models/Pokemon'
import PokeTrainerActionKind from './actions'

type PokeTrainerAction = {
  type: PokeTrainerActionKind.catchPokemon
  payload: { pokemon: IPokemon }
}

export default function (
  state: PokeTrainerState,
  action: PokeTrainerAction,
): PokeTrainerState {
  switch (action.type) {
    case PokeTrainerActionKind.catchPokemon:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload.pokemon],
        pokeBalls: state.pokeBalls - 1,
      }
    default:
      throw new Error('Action not allowed')
  }
}
