import { useState } from 'react'
import Numbers from "./components/numbers"

const App = () => {
  //numbers state
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  ]) 

  //controlled components
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  //event hander for submit
  const addNumber = (event) => {
    //prevent reloading after clicking the button
    event.preventDefault()
    //check if the name is already in the list
    if (checkName(newName)){
          //create new obj to update the state (not directly!)
      const newPersonObj = {
        name : newName,
        number : newNumber,
        id : String(persons.length+1)
      }
      //create new state with a new obj
      setPersons(persons.concat(newPersonObj))
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
    //set the empyt value for the input elements    
    setNewName("")
    setNewNumber("")
  }

  //event handler for input value changes
  const handleNameChange = (event) => {
    console.log("set {newName} =",event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log("set{newNumber}=",event.target.value)
    setNewNumber(event.target.value)
  }

  //return false if there is not a duplicate
  const checkName = (name) => {
    for (let i=0; i<persons.length; i++){
      if (name === persons[i].name)
        return false
    }
    return true
  }


  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={addNumber}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>number: <input 
              value={newNumber}
              onChange={handleNumberChange}/>
        </div>  
        <div><button type="submit">add</button></div>
      </form>


      <h2>Numbers</h2>
    
      <ul>
        {persons.map( person => <Numbers key={person.id} person={person}/>)}
      </ul>
      
    </div>
  )
}

export default App