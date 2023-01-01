import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPlayers } from '../game/reducer'
import { Player } from '../game/types';


interface DeletePlayerFunc {
  (name: string): void
}
interface PlayerProps {
  name: string;
  deletePlayer: DeletePlayerFunc;
}

const PlayerCard = ({ name, deletePlayer }: PlayerProps) => {
  return (
    <div>
      <span>{name}</span>
      <span onClick={() => deletePlayer(name)} style={{ color: 'red', marginLeft: 16 }}>X</span>
    </div>
  )
}

export default () => {
  const dispatch = useDispatch()
  const [players, setPlayers] = useState<Player[]>(JSON.parse(localStorage.getItem('players') || "[]"))
  const submit = () => {
    dispatch(addPlayers(players));
  }
  const inputEl = useRef<HTMLInputElement>(null);
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setPlayers([...players, { name: (e.target as HTMLInputElement).value}]);
      (e.target as HTMLInputElement).value = ""
    }
  }
  const deletePlayer = (name: String) => {
    setPlayers(players.filter(player => player.name !== name))
  }
  return (
    <div>
      <p>Init player</p>
      {players.map((player) => <PlayerCard key={player.name} name={player.name} deletePlayer={deletePlayer} />)}
      <input placeholder='Nhập tên rồi nhấn Enter' onKeyUp={onKeyUp} ref={inputEl} />
      <div><button onClick={submit}>Xong, tới bước chọn role</button></div>
    </div>
  )
}