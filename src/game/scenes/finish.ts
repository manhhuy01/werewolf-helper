import { CHARACTER_TYPE } from "../characters/type";
import { GameState, SCENE } from "../types";

const getNumberOfWolf = (game: GameState): number => game.players.filter(player => player.role === CHARACTER_TYPE.WOLF && player.isAlive).length;
const getNumberPlayerWithoutRole = (game: GameState): number => game.players.filter(player => !player.role).length;
const getNumberAlivePlayer = (game: GameState): number => game.players.filter(player => player.isAlive).length;

const Scene = {
  startCondition: (game: GameState) => {
    const numberOfWolf = getNumberOfWolf(game);
    const numberAlivePlayer = getNumberAlivePlayer(game);
    const numberPlayerWithoutRole = getNumberPlayerWithoutRole(game);
    return game.players.length
      && game.groupCharacters.length
      && (numberOfWolf === 0 || numberOfWolf * 2 === numberAlivePlayer)
      && !numberPlayerWithoutRole;
  },
  finishCondition: (game: GameState) => {
    return true;
  },
  renderComponent: SCENE.Finish,
}
export default Scene;