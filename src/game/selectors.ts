import { createSelector } from '@reduxjs/toolkit'
import scenes from './scenes'
import { RootState } from '../store'
import { CHARACTER_TYPE } from './characters/type';
import { Player } from './types';

export const selectCurrentScene = createSelector(
  (state: RootState) => state.game,
  (game) => {
    for(let i =0; i < scenes.length; i+=1){
      if(scenes[i].startCondition(game)) return scenes[i];
    }
    return undefined;
  }
)

export const selectTotalPlayer = createSelector(
  (state: RootState) => state.game,
  (game) => game.players.length
)

export const selectPlayerWithoutRole = createSelector(
  (state: RootState) => state.game,
  (game) => game.players.filter((player:Player) => !player.role)
)


export const selectNumberWolfCharacter = createSelector(
  (state: RootState) => state.game,
  (game) => game.groupCharacters.find(g => g.character.name === CHARACTER_TYPE.WOLF)?.number
)

export const selectTargetForBite = createSelector(
  (state: RootState) => state.game,
  (game) => game.players.filter(g => g.isAlive)
)

export const selectNumberTargetForBite = createSelector(
  (state: RootState) => state.game,
  (game) => 1
)

export const selectLastResult = createSelector(
  (state: RootState) => state.game,
  (game) => game.resultsAfterNight[game.resultsAfterNight.length - 1],
)