import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ChoseList from '../components/ChoseList';
import { Wolf } from '../game/characters';
import { addRoleToPlayers } from '../game/reducer'
import { selectNumberWolfCharacter, selectPlayerWithoutRole } from '../game/selectors';
import { Player } from '../game/types';

const Component = () => {
  const dispatch = useDispatch()
  const players = useSelector(selectPlayerWithoutRole);
  const numberWolf = useSelector(selectNumberWolfCharacter);
  const submit = (selectedPlayers: Player[]) => {
    dispatch(addRoleToPlayers(selectedPlayers
      .map(p => ({ ...p, role: Wolf.name }))
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

export default Component;