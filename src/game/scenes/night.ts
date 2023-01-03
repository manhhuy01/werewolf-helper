import { GameState, SCENE, SESSION } from "../types";
const Scene = {
  startCondition: (game: GameState) => {
    return game.players.length && game.groupCharacters.length && game.session !== SESSION.Night;
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.Night,
}
export default Scene;