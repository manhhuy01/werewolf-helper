import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addGroupCharacters, addPlayers } from '../game/reducer'
import Characters from '../game/characters'
import { selectTotalPlayer } from '../game/selectors'
import { Character, GroupCharacter } from '../game/characters/type'

interface DecreaseRole {
  (character: GroupCharacter): void
}

interface IncreaseRole extends DecreaseRole {

}
interface RoleProps {
  groupCharacter: GroupCharacter,
  decreaseRole: DecreaseRole,
  increaseRole: IncreaseRole,
}


const Role = ({ groupCharacter, decreaseRole, increaseRole }: RoleProps) => {
  return (
    <div>
      <span onClick={() => decreaseRole(groupCharacter)}> - </span>
      <span>{`${groupCharacter.character.name} : ${groupCharacter.number}`}</span>
      <span onClick={() => increaseRole(groupCharacter)}>+</span>
    </div>
  )
}

const Component = () => {
  const savedGroupCharacters = JSON.parse(localStorage.getItem('groupCharacters') || "[]")
  const [groupCharacters, setGroupCharacters] = useState<GroupCharacter[]>(Characters.map(character => ({
    character,
    number: (savedGroupCharacters.find((s: GroupCharacter) => s.character.name === character.name)?.number || 0)
  })))
  const dispatch = useDispatch()
  const [numberPlayer, setNumberPlayer] = useState<number>(useSelector(selectTotalPlayer) - savedGroupCharacters.reduce((agg: number, item: GroupCharacter) => agg += item.number, 0))

  const submit = () => {
    if (numberPlayer === 0) {
      dispatch(addGroupCharacters(groupCharacters.filter(g => g.number).map(groupCharacter => ({ ...groupCharacter, character: { name: groupCharacter.character.name } }))));
    }
  }
  const decreaseRole = (groupCharacter: GroupCharacter) => {
    const newCharacter = groupCharacters.find(c => c.character.name === groupCharacter.character.name);
    if (newCharacter && newCharacter.number > 0) {
      newCharacter.number -= 1;
      setNumberPlayer(numberPlayer + 1);
      setGroupCharacters([...groupCharacters]);
    }
  }
  const increaseRole = (groupCharacter: GroupCharacter) => {
    const newCharacter = groupCharacters.find(c => c.character.name === groupCharacter.character.name);
    if (newCharacter && numberPlayer > 0) {
      newCharacter.number += 1;
      setNumberPlayer(numberPlayer - 1);
      setGroupCharacters([...groupCharacters]);
    }
  }
  return (
    <div>
      <p>Init Roles</p>
      <p>Số người chưa phân role: {numberPlayer}</p>
      {
        groupCharacters.map(groupCharacter => <Role key={groupCharacter.character.name} groupCharacter={groupCharacter} decreaseRole={decreaseRole} increaseRole={increaseRole} />)
      }
      <button onClick={submit}>Click next scene</button>
    </div>
  )
}

export default Component;