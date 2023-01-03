import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { finishNight, startNight } from "../game/reducer";
import { selectLastResult } from "../game/selectors";

const Component = () => {
  const result = useSelector(selectLastResult)
  const dispatch = useDispatch()
  const submit = () => {
    dispatch(startNight());
  }
  useEffect(()=> {
    dispatch(finishNight())
  }, [dispatch])
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

      <div><button onClick={submit}>Vote</button></div>
    </div>

  )
}

export default Component;