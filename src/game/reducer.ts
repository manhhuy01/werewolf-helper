import { createSlice, current } from '@reduxjs/toolkit'
import { difference } from '../utils';
import { SkillByRole, TransformByRole } from './characters';
import { CHARACTER_TYPE } from './characters/type';
import { DefaultPlayer, EffectedPlayer, GameState, Player, ResultAfterNight, SESSION } from './types';


const initialState: GameState = {
  players: [],
  groupCharacters: [],
  actions: [],
  session: undefined,
  resultsAfterNight: [],
  historyActions: [],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: { ...initialState },
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
      const players = state.players.map(player => {
        let newPlayer = { ...player };
        if (newPlayer.isAlive) {
          const actionsToPlayer = state.actions.filter(action => action.target?.name === newPlayer.name);
          if (actionsToPlayer.length) {
            const effectedPlayer = actionsToPlayer.reduce((_player, action) => {
              const executeSkillFunc = SkillByRole[action.source];
              return executeSkillFunc ? executeSkillFunc(_player) : (_player as EffectedPlayer)
            }, newPlayer) as EffectedPlayer;
            if (effectedPlayer.role) {
              const transfromFunc = TransformByRole[effectedPlayer.role];
              if (transfromFunc) {
                newPlayer = transfromFunc(effectedPlayer);
              }
            }
          }
        }
        return newPlayer;
      })

      const deadPlayers = players.filter(player => !player.isAlive).map(player => player.name);
      const alivePlayersBefore = state.players.filter(player => deadPlayers.includes(player.name) && player.isAlive);
      resultAfterNight.deadPlayers = alivePlayersBefore;
      state.players = players;
      state.resultsAfterNight.push(resultAfterNight);
      state.historyActions.push({ actions: [...state.actions] })
      state.actions = []
      state.session = SESSION.Day;
    },
    hangedPlayer: (state, action) => {
      let hangedPlayers = action.payload as Player[];
      hangedPlayers.forEach(hangedPlayer => {
        let player = state.players.find(p => p.name === hangedPlayer.name);
        if (player) {
          player.isAlive = false;
        }
      })

    },
    finishDay: (state) => {
      state.session = undefined;
    },
    restart: (state) => {
      state.players = [];
      state.groupCharacters = [];
      state.historyActions = [];
      state.actions = [];
      state.session = undefined;
      state.resultsAfterNight = []
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
  hangedPlayer,
  finishDay,
  restart,
} = gameSlice.actions

export default gameSlice.reducer