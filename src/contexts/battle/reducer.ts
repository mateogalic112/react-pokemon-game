import { BattleState } from '.'
import BattleActionKind from './actions'

type BattleAction =
  | {
      type: BattleActionKind.pokemonAttack
      payload: { newMessages: string[] }
    }
  | {
      type: BattleActionKind.pokeballThrown
      payload: { newMessage: string }
    }

const battleReducer = (
  state: BattleState,
  action: BattleAction
): BattleState => {
  switch (action.type) {
    case BattleActionKind.pokemonAttack:
      return {
        ...state,
        battleMessages: [
          ...state.battleMessages,
          ...action.payload.newMessages,
        ],
        turn: state.turn + 1,
      }
    case BattleActionKind.pokeballThrown:
      return {
        ...state,
        battleMessages: [...state.battleMessages, action.payload.newMessage],
      }
    default:
      throw new Error('Action not allowed')
  }
}

export default battleReducer
