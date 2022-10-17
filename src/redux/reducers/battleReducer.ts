import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Pokemon from '../../models/Pokemon'
import PokeTrainer from '../../models/PokeTrainer'

// Define a type for the slice state
interface BattleState {
  pokeTrainer: PokeTrainer | null
  opponentPokemon: Pokemon | null
}

// Define the initial state using that type
const initialState: BattleState = {
  pokeTrainer: null,
  opponentPokemon: null,
}

export const battleSlice = createSlice({
  name: 'battle',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
})

export const {} = battleSlice.actions

export default battleSlice.reducer
