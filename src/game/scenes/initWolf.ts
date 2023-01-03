import { CHARACTER_TYPE } from "../characters/type";
import { GameState, SCENE } from "../types";

const Scene = {
  startCondition: (game: GameState) => {
    return !game.players.find(player => player.role === CHARACTER_TYPE.WOLF);
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.InitWolf,
}

export default Scene;