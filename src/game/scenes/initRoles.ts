import { SCENE } from "../types";
import { GameState } from "../types";


export default {
  startCondition: (game: GameState) => {
    return game.groupCharacters.length === 0;
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.InitRole,
}