import React from "react"
import { useDispatch } from "react-redux";
import { startNight } from "../game/reducer";

const Component = () => {
  const dispatch = useDispatch()
  const submit = () => {
    dispatch(startNight());
  }
  return (
    <div>
      <div>Màn đêm buông xuống</div>
      <div><button onClick={submit}>Bắt đầu hành động</button></div>
    </div>

  )
}

export default Component;