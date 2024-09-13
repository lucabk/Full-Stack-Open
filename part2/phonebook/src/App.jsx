import { useState } from 'react'
import Numbers from "./components/numbers"
import Filter from './components/filter'
import PersonForm from './components/personform'

const App = () => {
  //numbers state
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  //controlled components
  const [newName, setNewName] = useState('') //new name
  const [newNumber, setNewNumber] = useState('') //new number
  const [search, setSearch] = useState('') //filter values

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

  //event handler for input values changes
  const handleNameChange = (event) => {
    console.log("set {newName} =",event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log("set {newNumber}=",event.target.value)
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


  //event handler for searching names
  const handleSearch = (event) => {
    console.log("set {search}=", event.target.value)
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      < Filter search={search} handleSearch={handleSearch}/>
      
      <h2>Add a new</h2>
      < PersonForm 
        addNumber={addNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}/>

      <h2>Numbers</h2>
      <ul>
        {persons.map( person => <Numbers key={person.id} person={person} search={search}/>)}
      </ul>
      
    </div>
  )
}

export default App