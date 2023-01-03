import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ChoseList from '../components/ChoseList';
import { Wolf } from '../game/characters';
import { Skill } from '../game/characters/type';
import { addAction } from '../game/reducer'
import { selectNumberTargetForBite, selectTargetForBite } from '../game/selectors';
import { Player } from '../game/types';

const Component = () => {
  const dispatch = useDispatch()
  const [players] = useState<Player[]>(useSelector(selectTargetForBite));
  const numberBite = useSelector(selectNumberTargetForBite);
  const submit = (selectedPlayers: Player[]) => {
    if(selectedPlayers.length){
      selectedPlayers.forEach(selectedPlayer => {
        dispatch(addAction({
          source: Wolf.name,
          target: selectedPlayer,
          skill: Skill.BITE
        }));
      })
    } else {
      dispatch(addAction({
        source: Wolf.name,
        target: undefined,
        skill: Skill.BITE
      }));
    }
   
    
  }
  return (
    <div>
      <p>Sói cắn ai</p>
      <ChoseList 
        items={players}
        limit={numberBite}
        submit={submit}
      />
    </div>
  )
}

export default Component;