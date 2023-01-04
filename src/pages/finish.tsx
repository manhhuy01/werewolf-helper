import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { restart } from "../game/reducer";
import { selectIsAliveWolf } from "../game/selectors";
import { Action, HistoryAction } from "../game/types";
import { RootState } from "../store";


const Component = () => {
  const historyActions = useSelector((state: RootState) => state.game.historyActions);
  const resultsAfterNight = useSelector((state: RootState) => state.game.resultsAfterNight);
  const dispatch = useDispatch()
  const submit = () => {
    dispatch(restart());
  }

  const aliveWolf = useSelector(selectIsAliveWolf);

  return (
    <div>
      <div>Kết thúc game</div>
      {
        aliveWolf ? <div> Sói thắng </div> : <div> Người thắng </div>
      }
      <div>Lịch sử</div>
      {
        historyActions.map((historyAction: HistoryAction, i) => {
          return (
            <div key={i}>
              <p>{`Đêm ${i + 1}`}</p>
              {historyAction.actions.map((action: Action, i) => {
                return (
                  <p key={i}>{`${action.source} - ${action.skill} - ${action.target?.name}`}</p>
                )
              })}
              <p>{`Ngày ${i + 1}`}</p>
              {
                resultsAfterNight[i].deadPlayers.length ?
                  <p key={i}>{`có ${resultsAfterNight[i].deadPlayers.length} người chết là ${resultsAfterNight[i].deadPlayers.map(player => player.name).join(',')}`}</p> :
                  <p key={i}>Không có ai chết</p>

              }
            </div>
          )
        })
      }
      <div><button onClick={submit}>Restart</button></div>
    </div>

  )
}

export default Component;