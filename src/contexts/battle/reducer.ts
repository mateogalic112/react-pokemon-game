import { BattleState } from '.'
import Pokemon from '../../models/Pokemon'
import BattleActionKind from './actions'

type BattleAction =
  | {
      type: BattleActionKind.storeOpponent
      payload: { foe: Pokemon }
    }
  | {
      type: BattleActionKind.switchPokemon
      payload: { fightingPokemon: Pokemon }
    }
  | {
      type: BattleActionKind.storeUsedPokemon
      payload: { pokemonId: number; hp: number }
    }

const battleReducer = (
  state: BattleState,
  action: BattleAction
): BattleState => {
  switch (action.type) {
    case BattleActionKind.storeOpponent:
      return {
        ...state,
        foe: action.payload.foe,
      }
    case BattleActionKind.switchPokemon:
      return {
        ...state,
        fightingPokemon: action.payload.fightingPokemon,
      }
    case BattleActionKind.storeUsedPokemon:
      return {
        ...state,
        usedPokemons: new Map(
          state.usedPokemons.set(action.payload.pokemonId, action.payload.hp)
        ),
      }
    default:
      throw new Error('Action not allowed')
  }
}

export default battleReducer
