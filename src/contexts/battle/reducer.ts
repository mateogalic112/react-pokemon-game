import { BattleState } from '.'
import Pokemon from '../../models/Pokemon'
import BattleActionKind from './actions'

type BattleAction = {
  type: BattleActionKind.storeOpponent
  payload: { foe: Pokemon }
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
    default:
      throw new Error('Action not allowed')
  }
}

export default battleReducer
