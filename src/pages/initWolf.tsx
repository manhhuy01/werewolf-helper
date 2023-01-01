import React, { KeyboardEventHandler, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CHARACTER_TYPE } from '../game/characters/type';
import { addPlayers, addRoleToPlayers } from '../game/reducer'
import { selectPlayerWithoutRole } from '../game/selectors';
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

const PlayerCard = ({ player, chosePlayer }: PlayerProps) => {
  return (
    <div>
      <span style={{background: player.selected ? 'gray': 'unset'}} onClick={() => chosePlayer(player)}>{player.name}</span>
    </div>
  )
}

export default () => {
  const dispatch = useDispatch()
  const [players, setPlayers] = useState<SelectedPlayer[]>(useSelector(selectPlayerWithoutRole).map(player => ({...player, selected: false})))
  const submit = () => {
    dispatch(addRoleToPlayers(players
      .filter(p => p.selected)
      .map(p => ({ ...p, role: { name: CHARACTER_TYPE.WOLF}}))
    ));
  }
  const chosePlayer = (player: SelectedPlayer) => {
    let foundPlayer = players.find(p => p.name === player.name);
    if(foundPlayer){
      foundPlayer.selected = !foundPlayer.selected;
      setPlayers([...players])
    }

  }
  return (
    <div>
      <p>Ai là sói nào</p>
      {players.map((player) => <PlayerCard key={player.name} player={player} chosePlayer={chosePlayer} />)}
      <div><button onClick={submit}>Next step</button></div>
    </div>
  )
}