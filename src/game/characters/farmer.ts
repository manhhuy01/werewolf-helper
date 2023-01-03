import { deadByBite } from "./transformations";
import { Character, CHARACTER_TYPE } from "./type";

interface Farmer extends Character {
}

const farmer : Farmer = {
  name: CHARACTER_TYPE.FARMER,
}

export const transform = deadByBite;

export default farmer;