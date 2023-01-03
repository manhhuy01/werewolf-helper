import { createSlice, current } from '@reduxjs/toolkit'
import { difference } from '../utils';
import { SkillByRole, TransformByRole } from './characters';
import { CHARACTER_TYPE, GroupCharacter, Skill } from './characters/type';
import { Action, DefaultPlayer, EffectedPlayer, GameState, Player, ResultAfterNight, SESSION } from './types';


const initialState: GameState = {
  players: [],
  groupCharacters: [],
  actions: [],
  session: undefined,
  resultsAfterNight: []
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addPlayers: (state, action) => {
      state.players = (action.payload as Player[]).map(player => ({ ...DefaultPlayer, ...player }));
      localStorage.setItem('players', JSON.stringify(action.payload))
    },
    addGroupCharacters: (state, action) => {
      state.groupCharacters = action.payload
      localStorage.setItem('groupCharacters', JSON.stringify(state.groupCharacters))
    },
    addRoleToPlayers: (state, action) => {
      const playerRoles = action.payload as Player[];
      playerRoles.forEach(playerRole => {
        let player = state.players.find(p => p.name === playerRole.name);
        if (player) {
          player.role = playerRole.role;
        }
      })
      const characters = state.groupCharacters.filter(g => g.number).map(g => g.character.name);
      const existedRoles = state.players.map(p => p.role).filter(Boolean);
      const anotherRoles = difference([characters, existedRoles]);
      if (anotherRoles.length === 1) {
        state.players.forEach(player => {
          if (!player.role) {
            player.role = anotherRoles[0] as CHARACTER_TYPE;
          }
        })
      }
    },
    addAction: (state, action) => {
      state.actions.push(action.payload);
    },
    startNight: (state) => {
      state.session = SESSION.Night;
    },
    finishNight: (state) => {
      const resultAfterNight: ResultAfterNight = {
        deadPlayers: [],
      }
      state.players.forEach(player => {

        if (player.isAlive) {
          const actionsToPlayer = state.actions.filter(action => action.target?.name === player.name);
          if (actionsToPlayer.length) {
            const effectedPlayer = actionsToPlayer.reduce((player, action) => {
              const executeSkillFunc = SkillByRole[action.source];
              return executeSkillFunc ? executeSkillFunc(player) : (player as EffectedPlayer)
            }, player) as EffectedPlayer;
            if (effectedPlayer.role) {
              const transfromFunc = TransformByRole[effectedPlayer.role];
              if (transfromFunc) {
                const newPlayer = transfromFunc(effectedPlayer);
                player = newPlayer;
                if (!player.isAlive) {
                  resultAfterNight.deadPlayers.push(player);
                }
              }
            }
          }
        }
      })
      state.resultsAfterNight.push(resultAfterNight);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addPlayers,
  addGroupCharacters,
  addRoleToPlayers,
  addAction,
  startNight,
  finishNight,
} = gameSlice.actions

export default gameSlice.reducer