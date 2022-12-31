import { SCENE } from ".";
import { GameState } from "../reducer";

export default {
  startCondition: (game: GameState) => {
    return game.players.length === 0;
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.InitPlayer,
}