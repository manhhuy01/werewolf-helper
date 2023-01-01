import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentScene } from '../game/selectors'
import InitPlayer from './initPlayer';
import InitRole from './initRole';
import Error from './error';
import React from 'react';
import { SCENE } from '../game/types';
import initWolf from './initWolf';

const components = {
  [SCENE.InitPlayer]: InitPlayer,
  [SCENE.InitRole]: InitRole,
  [SCENE.InitWolf]: initWolf,
}

export default () => {
  
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