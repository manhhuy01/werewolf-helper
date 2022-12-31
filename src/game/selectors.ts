import { createSelector } from '@reduxjs/toolkit'
import scenes from './scenes'
import { RootState } from '../store'

export const selectCurrentScene = createSelector(
  (state: RootState) => state.game,
  (game) => {
    for(let i =0; i < scenes.length; i+=1){
      if(scenes[i].startCondition(game)) return scenes[i];
    }
    return undefined;
  }
)