import actionWolf from "./actionWolf";
import initPlayer from "./initPlayer";
import initRoles from "./initRoles";
import initWolf from "./initWolf";
import night from './night';
import day from './day'

const scenes = [
  initPlayer,
  initRoles,
  night,
  initWolf,
  actionWolf,
  day,
]

export default scenes;

