import { createContext, FC, useContext, useReducer } from 'react'
import Pokemon from '../../models/Pokemon'
import BattleActionKind from './actions'
import battleReducer from './reducer'

export interface BattleState {
  foe: Pokemon | null
}

const initialState: BattleState = {
  foe: null,
}

interface IBattleContext extends BattleState {
  storeOpponent: (pokemon: Pokemon) => void
}

const initialContext: IBattleContext = {
  ...initialState,

  storeOpponent: () => {},
}

const BattleContext = createContext<IBattleContext>(initialContext)

export const useBattleContext = () => {
  const context = useContext(BattleContext)

  if (!context) {
    throw new Error('Context must be within BattleContext.Provider!')
  }

  return context
}

export const BattleProvider: FC = ({ children }) => {
  const [{ foe }, dispatch] = useReducer(battleReducer, initialState)

  const storeOpponent = (foe: Pokemon) => {
    // Battle sound
    const battle = new Audio('/battle.mp3')
    battle.play()

    dispatch({
      type: BattleActionKind.storeOpponent,
      payload: { foe },
    })
  }

  return (
    <BattleContext.Provider
      value={{
        foe,
        storeOpponent,
      }}
    >
      {children}
    </BattleContext.Provider>
  )
}
