import { EffectedPlayer } from "../types";
import { Skill } from "./type";

export const deadByBite = (effectedPlayer: EffectedPlayer) => {
  let newPlayer = { ...effectedPlayer };
  if (effectedPlayer.effected === Skill.BITE) {
    newPlayer.isAlive = false
    delete newPlayer.effected;
  }
  return newPlayer;
}