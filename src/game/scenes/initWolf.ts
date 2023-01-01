import { CHARACTER_TYPE } from "../characters/type";
import { GameState, SCENE } from "../types";

export default {
  startCondition: (game: GameState) => {
    return !game.players.find(player => player.role?.name === CHARACTER_TYPE.WOLF);
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.InitWolf,
}