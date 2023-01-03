import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ChoseList from '../components/ChoseList';
import { CHARACTER_TYPE } from '../game/characters/type';
import { addRoleToPlayers } from '../game/reducer'
import { selectNumberWolfCharacter, selectPlayerWithoutRole } from '../game/selectors';
import { Player } from '../game/types';

interface SelectedPlayer extends Player {
  selected?: boolean;
}

interface ChosePlayerFunc {
  (player: SelectedPlayer): void
}
interface PlayerProps {
  player: SelectedPlayer;
  chosePlayer: ChosePlayerFunc;
}

export default () => {
  const dispatch = useDispatch()
  const [players] = useState<Player[]>(useSelector(selectPlayerWithoutRole));
  console.log(players)
  const numberWolf = useSelector(selectNumberWolfCharacter);
  const submit = () => {
    dispatch(addRoleToPlayers(players
      .map(p => ({ ...p, role: { name: CHARACTER_TYPE.WOLF}}))
    ));
  }
  return (
    <div>
      <p>Ai là sói nào</p>
      <ChoseList 
        items={players}
        limit={numberWolf}
        submit={submit}
      />
    </div>
  )
}