import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { finishDay, finishNight } from "../game/reducer";
import { selectLastResult } from "../game/selectors";
import { hangedPlayer } from '../game/reducer'
import { selectAlivePlayer } from '../game/selectors';
import { Player } from '../game/types';
import ChoseList from '../components/ChoseList';


const Component = () => {
  const result = useSelector(selectLastResult)
  const dispatch = useDispatch()
  const submit = () => {
    dispatch(finishDay());
  }
  useEffect(()=> {
    dispatch(finishNight())
  }, [dispatch])

  const players = useSelector(selectAlivePlayer);
  const hanged = (selectedPlayers: Player[]) => {
    dispatch(hangedPlayer(selectedPlayers));
  }
  return (
    <div>
      <div>Trời sáng rồi</div>
      <div>Đêm qua: </div>
      {
        !!result && (
          <div>{`Có ${result.deadPlayers.length} người chết là ${result.deadPlayers.map(player => player.name).join(',')}`}</div>
        )
      }
      {
        !result && (<div>Đêm qua không ai chết</div>)
      }
      <p>Người nào bị treo cổ ?</p>
      <ChoseList 
        items={players}
        limit={1}
        submit={hanged}
        submitLabel="Treo cổ"
      />
      <div><button onClick={submit}>Màn đêm buông xuống</button></div>
    </div>

  )
}

export default Component;