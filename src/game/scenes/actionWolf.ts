import { CHARACTER_TYPE } from "../characters/type";
import { GameState, SCENE, SESSION } from "../types";

const Scence = {
  startCondition: (game: GameState) => {
    return !game.actions.find(action => action.source === CHARACTER_TYPE.WOLF) && game.session === SESSION.Night;
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.ActionWolf,
}

export default Scence;