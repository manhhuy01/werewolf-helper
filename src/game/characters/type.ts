export enum CHARACTER_TYPE {
  FARMER = 'FARMER',
  WOLF = 'WOLF'
}

export interface Character {
  name: CHARACTER_TYPE,
}

export interface GroupCharacter {
  character: Character,
  number: number
}

export enum Skill {
  KILL = 'KILL'
}