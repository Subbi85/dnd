import React, {useState , useEffect} from 'react'
import { useAppContext } from './AppContext'

const InventarDisplay = () => {
    const [chosenCharacter, setChosenCharacter] = useState([])
    
    useEffect(() => {
      setChosenCharacter(JSON.parse(localStorage.getItem('chosenCharacter')))
    }, [])

    console.log(chosenCharacter)

  return (
    <div>Inventar von {chosenCharacter.name}</div>
  )
}

export default InventarDisplay