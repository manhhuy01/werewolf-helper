import { EffectedPlayer, Player } from "../types"

export enum CHARACTER_TYPE {
  FARMER = 'FARMER',
  WOLF = 'WOLF'
}

export interface executeSkill {
  (player: Player): Player
}

export interface transform {
  (effectedPlayer: EffectedPlayer): Player
}


export interface Character {
  name: CHARACTER_TYPE,
}

export interface GroupCharacter {
  character: Character,
  number: number
}

export enum Skill {
  BITE = 'BITE'
}