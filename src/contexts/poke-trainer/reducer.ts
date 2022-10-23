import { PokeTrainerState } from './index'
import PokeTrainerActionKind from './actions'
import PokeTrainer from '../../models/PokeTrainer'

type PokeTrainerAction = {
  type: PokeTrainerActionKind.setTrainer
  payload: { trainer: PokeTrainer }
}

const pokeTrainerReducer = (
  state: PokeTrainerState,
  action: PokeTrainerAction
): PokeTrainerState => {
  switch (action.type) {
    case PokeTrainerActionKind.setTrainer:
      return {
        ...state,
        trainer: action.payload.trainer,
      }
    default:
      throw new Error('Action not allowed')
  }
}

export default pokeTrainerReducer
