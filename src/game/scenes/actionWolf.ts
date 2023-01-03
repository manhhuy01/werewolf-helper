import { CHARACTER_TYPE } from "../characters/type";
import { GameState, SCENE } from "../types";

export default {
  startCondition: (game: GameState) => {
    return game.players.filter(p=> p.role?.name === CHARACTER_TYPE.WOLF).length === game.groupCharacters.find(g=> g.character.name === CHARACTER_TYPE.WOLF)?.number;
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.InitPlayer,
}