import { SCENE } from "../dto";
import { GameState } from "../reducer";


export default {
  startCondition: (game: GameState) => {
    return game.roles.length === 0;
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.InitRole,
}