import { Character, CHARACTER_TYPE, GroupCharacter, Skill } from "./characters/type";

export enum SCENE {
  InitPlayer = 'initPlayer',
  InitRole = 'initRole',
  InitWolf = 'initWolf',
  ActionWolf = 'actionWolf',
  Night = 'night',
  Day = 'day',
}

export enum SESSION {
  Day = 'day',
  Night = 'night'
}


export interface Player {
  name: string;
  role?: CHARACTER_TYPE;
  isAlive: boolean;
}

export interface EffectedPlayer extends Player {
  effected: Skill | undefined,
}

export const DefaultPlayer : Player = {
  name: "default",
  isAlive: true,
}

export interface Action {
  source: CHARACTER_TYPE,
  target: Player | undefined,
  skill: Skill
}

export interface ResultAfterNight {
  deadPlayers: Player[],
}

export interface GameState {
  players: Player[],
  groupCharacters: GroupCharacter[],
  actions: Action[],
  session: SESSION | undefined,
  resultsAfterNight: ResultAfterNight[]
}
