import { OpponentState } from '.'
import Pokemon from '../../models/Pokemon'
import OpponentActionKind from './actions'

type OpponentAction = {
  type: OpponentActionKind.storeOpponent
  payload: { foe: Pokemon }
}

const battleReducer = (
  state: OpponentState,
  action: OpponentAction
): OpponentState => {
  switch (action.type) {
    case OpponentActionKind.storeOpponent:
      return {
        ...state,
        foe: action.payload.foe,
      }
    default:
      throw new Error('Action not allowed')
  }
}

export default battleReducer
