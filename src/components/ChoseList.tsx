import React, { useEffect, useState } from "react"
import { Player } from "../game/types";

interface Props {
  items: Player[],
  limit: number | undefined,
  submit: SubmitFunc,
  submitLabel?: string,
}

interface SubmitFunc {
  (selectedItems: Player[]): void
}

interface SelectedPlayer extends Player {
  selected?: boolean;
}

interface ChosePlayerFunc {
  (player: SelectedPlayer): void
}

interface PlayerProps {
  data: SelectedPlayer;
  chosePlayer: ChosePlayerFunc;
}

const PlayerCard = ({ data, chosePlayer }: PlayerProps) => {
  return (
    <div>
      <span style={{ background: data.selected ? 'gray' : 'unset' }} onClick={() => chosePlayer(data)}>{data.name}</span>
    </div>
  )
}

const ChoseList = ({ items, limit = 1, submit, submitLabel = 'Next step' }: Props) => {
  useEffect(()=> {
    setItems(items.map(i=>({...i, selected: false})))
  }, [items])
  const [stateItems, setItems] = useState<SelectedPlayer[]>(items.map(i => ({ ...i, selected: false })))
  const chosePlayer = (player: SelectedPlayer) => {
    let foundPlayer = stateItems.find(p => p.name === player.name);
    if (foundPlayer) {
      if(foundPlayer.selected || stateItems.filter(item => item.selected).length < limit){
        foundPlayer.selected = !foundPlayer.selected;
        setItems([...stateItems])
      }
    }

  }

  return (
    <div>
      {stateItems.map((item, i) => <PlayerCard key={i} data={item} chosePlayer={chosePlayer} />)}
      <div><button onClick={() => submit(stateItems.filter(item => item.selected) as Player[])}>{submitLabel}</button></div>
    </div>

  )
}

export default ChoseList;