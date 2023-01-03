import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentScene } from '../game/selectors'
import React from 'react';
import { SCENE } from '../game/types';
import InitWolf from './initWolf';
import ActionWolf from './actionWolf'
import InitPlayer from './initPlayer';
import InitRole from './initRole';
import Error from './error';
import Night from './night';
import Day from './day';

const components = {
  [SCENE.InitPlayer]: InitPlayer,
  [SCENE.InitRole]: InitRole,
  [SCENE.InitWolf]: InitWolf,
  [SCENE.ActionWolf]: ActionWolf,
  [SCENE.Night]: Night,
  [SCENE.Day]: Day,
}

const Game = () => {
  
  const scene = useSelector(selectCurrentScene);
  if (!scene) {
    return <Error />
  }
  const Component = components[scene.renderComponent]

  return (
    <div>
      <Component />
    </div>
  )
}

export default Game;