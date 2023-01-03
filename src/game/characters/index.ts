import farmer from "./farmer";
import { deadByBite } from "./transformations";
import { CHARACTER_TYPE } from "./type";
import wolf, { WolfSkill } from "./wolf";

export const Farmer = farmer;
export const Wolf = wolf;

const characters = [Farmer, Wolf]

export const TransformByRole = {
  [CHARACTER_TYPE.FARMER]: deadByBite,
  [CHARACTER_TYPE.WOLF]: deadByBite,
}

export const SkillByRole = {
  [CHARACTER_TYPE.FARMER]: undefined,
  [CHARACTER_TYPE.WOLF]: WolfSkill,
}

export default characters;