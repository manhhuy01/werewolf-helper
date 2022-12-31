import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

interface Player {
  name: String;
}
interface Role {
  name: String;
  number: Number;
}

export interface GameState {
  players: Player[],
  roles: Role[],
}

const initialState : GameState = {
  players: [],
  roles: [],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addPlayers: (state, action) => {
      state.players = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addPlayers } = gameSlice.actions

export default gameSlice.reducer