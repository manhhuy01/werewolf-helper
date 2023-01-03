import { EffectedPlayer, Player } from "../types";
import { deadByBite } from "./transformations";
import { Character, CHARACTER_TYPE, Skill } from "./type";

interface Wolf extends Character {
}



const wolf : Wolf = {
  name: CHARACTER_TYPE.WOLF,
 
}

export const WolfSkill = (player: Player) => {
  const effectedPlayer: EffectedPlayer = {
    ...player,
    effected: Skill.BITE,
  }
  return effectedPlayer;
};

export default wolf;