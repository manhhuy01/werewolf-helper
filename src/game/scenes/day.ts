import { GameState, SCENE, SESSION } from "../types";
import { SkillByRole } from '../characters'
const Scene = {
  startCondition: (game: GameState) => {
    return game.players.length && game.groupCharacters.length 
      && (!game.players.find(player => player.isAlive && player.role && SkillByRole[player.role] && !game.actions.find(action => action.source === player.role)) 
      || game.session === SESSION.Day);
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.Day,
}
export default Scene;