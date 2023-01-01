import { Character, GroupCharacter, Skill } from "./characters/type";

export enum SCENE {
  InitPlayer = 'initPlayer',
  InitRole = 'initRole',
  InitWolf = 'initWolf',
}


export interface Player {
  name: string;
  role?: Character
}

export interface Action {
  source: Character,
  target: Player,
  skill: Skill
}

export interface GameState {
  players: Player[],
  groupCharacters: GroupCharacter[],
  actions: Action[],
}
