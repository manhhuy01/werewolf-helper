import { CHARACTER_TYPE } from "../characters/type";
import { GameState, SCENE } from "../types";

const Scence = {
  startCondition: (game: GameState) => {
    return !game.actions.find(action => action.source === CHARACTER_TYPE.WOLF);
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.ActionWolf,
}

export default Scence;