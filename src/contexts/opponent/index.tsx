import { createContext, FC, useContext, useReducer } from 'react'
import Pokemon from '../../models/Pokemon'
import OpponentActionKind from './actions'
import opponentReducer from './reducer'

export interface OpponentState {
  foe: Pokemon | null
}

const initialState: OpponentState = {
  foe: null,
}

interface IOpponentContext extends OpponentState {
  storeOpponent: (pokemon: Pokemon) => void
}

const initialContext: IOpponentContext = {
  ...initialState,
  storeOpponent: () => {},
}

const OpponentContext = createContext<IOpponentContext>(initialContext)

export const useOpponentContext = () => {
  const context = useContext(OpponentContext)

  if (!context) {
    throw new Error('Context must be within OpponentContext.Provider!')
  }

  return context
}

export const OpponentProvider: FC = ({ children }) => {
  const [{ foe }, dispatch] = useReducer(opponentReducer, initialState)

  const storeOpponent = (foe: Pokemon) => {
    // Battle sound
    const startBattle = new Audio('/battle.mp3')
    startBattle.play()

    dispatch({
      type: OpponentActionKind.storeOpponent,
      payload: { foe },
    })
  }

  return (
    <OpponentContext.Provider
      value={{
        foe,
        storeOpponent,
      }}
    >
      {children}
    </OpponentContext.Provider>
  )
}
