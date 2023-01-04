import actionWolf from "./actionWolf";
import initPlayer from "./initPlayer";
import initRoles from "./initRoles";
import initWolf from "./initWolf";
import night from './night';
import day from './day';
import finish from './finish'

const scenes = [
  initPlayer,
  initRoles,
  finish,
  night,
  initWolf,
  actionWolf,
  day,
]

export default scenes;

