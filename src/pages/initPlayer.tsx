import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPlayers } from '../game/reducer'


export default () => {
  const dispatch = useDispatch()
  const submit = () => {
    dispatch(addPlayers([{name: 'huy'}]));
  }
  return (
    <div>
      <p>Init player</p>
      <button onClick={submit}>Click next scene</button>
    </div>
  )
}