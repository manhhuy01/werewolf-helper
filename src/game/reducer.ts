import { createSlice } from '@reduxjs/toolkit'
import { CHARACTER_TYPE, GroupCharacter } from './characters/type';
import { GameState, Player } from './types';


const initialState: GameState = {
  players: [],
  groupCharacters: [],
  actions: [],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addPlayers: (state, action) => {
      state.players = (action.payload as Player[]).map(p => ({ ...p, role: { name: CHARACTER_TYPE.FARMER } }));
      localStorage.setItem('players', JSON.stringify(action.payload))
    },
    addGroupCharacters: (state, action) => {
      state.groupCharacters = action.payload;
      localStorage.setItem('groupCharacters', JSON.stringify(action.payload.filter((groupCharacter: GroupCharacter) => groupCharacter.number)))
    },
    addRoleToPlayers: (state, action) => {
      const playerRoles = action.payload as Player[];
      playerRoles.forEach(playerRole => {
        let player = state.players.find(p => p.name === playerRole.name);
        if (player) {
          player.role = playerRole.role;
        }
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { addPlayers, addGroupCharacters, addRoleToPlayers } = gameSlice.actions

export default gameSlice.reducer