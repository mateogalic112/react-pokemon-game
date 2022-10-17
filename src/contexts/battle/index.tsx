import { createContext, FC, useContext, useReducer, useState } from 'react'
import Battle from '../../models/Battle'
import Pokemon, { Move } from '../../models/Pokemon'
import PokeTrainer from '../../models/PokeTrainer'
import { usePokeTrainerContext } from '../poke-trainer'
import BattleActionKind from './actions'
import battleReducer from './reducer'

export interface BattleState {
  foe: Pokemon | null
  foeHp: number

  fightingPokemon: Pokemon | null
  fightingPokemonHp: number

  trainer: PokeTrainer | null
  usedPokemons: Map<number, number>
}

const initialState: BattleState = {
  foe: null,
  foeHp: 0,

  fightingPokemon: null,
  fightingPokemonHp: 0,

  trainer: null,
  usedPokemons: new Map(),
}

interface IBattleContext extends BattleState {
  storeOpponent: (pokemon: Pokemon) => void
  switchPokemon: (pokemon: Pokemon) => void
  storeUsedPokemon: (pokemonId: number, hp: number) => void
}

const initialContext: IBattleContext = {
  ...initialState,

  storeOpponent: () => {},
  switchPokemon: () => {},
  storeUsedPokemon: () => {},
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
  const [
    { foe, foeHp, fightingPokemon, fightingPokemonHp, usedPokemons },
    dispatch,
  ] = useReducer(battleReducer, initialState)

  const { trainer } = usePokeTrainerContext()
  const battle = new Battle(foe, fightingPokemon)

  const storeOpponent = (foe: Pokemon) => {
    // Battle sound
    const battle = new Audio('/battle.mp3')
    battle.play()

    dispatch({
      type: BattleActionKind.storeOpponent,
      payload: { foe },
    })
  }

  const switchPokemon = (newFightingPokemon: Pokemon) => {
    dispatch({
      type: BattleActionKind.switchPokemon,
      payload: { fightingPokemon: newFightingPokemon },
    })
  }

  const storeUsedPokemon = (pokemonId: number, hp: number) => {
    dispatch({
      type: BattleActionKind.storeUsedPokemon,
      payload: { pokemonId, hp },
    })
  }

  return (
    <BattleContext.Provider
      value={{
        foe,
        foeHp,
        fightingPokemon,
        fightingPokemonHp,
        usedPokemons,
        trainer,
        storeOpponent,
        switchPokemon,
        storeUsedPokemon,
      }}
    >
      {children}
    </BattleContext.Provider>
  )
}
