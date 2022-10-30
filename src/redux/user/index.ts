import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthData } from '../../api/models/AuthData'
import { RootState } from '../store'

// Define a type for the slice state
interface UserState {
  authData: AuthData | null
}

// Define the initial state using that type
const initialState: UserState = {
  authData: null,
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<AuthData>) => {
      state.authData = action.payload
    },
    clear: (state) => {
      state.authData = null
    },
  },
})

export const { auth, clear } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
