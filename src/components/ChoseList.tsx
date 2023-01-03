import React, { useState } from "react"
import { Player } from "../game/types";

interface Props {
  items: Player [],
  limit: number | undefined,
  submit: SubmitFunc,
}

interface SubmitFunc {
  (selectedItems: Player[]) : void
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
      <span style={{background: data.selected ? 'gray': 'unset'}} onClick={() => chosePlayer(data)}>{data.name}</span>
    </div>
  )
}

export default ({ items, limit = 1, submit }: Props) => {
  const [stateItems, setItems] = useState<SelectedPlayer[]>(items.map(i=> ({...i, selected: false})))
  const chosePlayer = (player: SelectedPlayer) => {
    if(stateItems.filter(item => item.selected).length < limit){
      let foundPlayer = stateItems.find(p => p.name === player.name);
      if (foundPlayer) {
        foundPlayer.selected = !foundPlayer.selected;
        setItems([...stateItems])
      }
    }
  }

  return (
    <div>
      {stateItems.map((item, i) => <PlayerCard key={i} data={item} chosePlayer={chosePlayer} />)}
      <div><button onClick={() => submit(stateItems.filter(item => item.selected) as Player[])}>Next step</button></div>
    </div>

  )
}