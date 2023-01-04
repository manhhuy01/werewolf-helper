import { GameState, SCENE } from "../types";
const Scene = {
  startCondition: (game: GameState) => {
    console.log(game.players)
    return game.players.length === 0;
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.InitPlayer,
}
export default Scene;