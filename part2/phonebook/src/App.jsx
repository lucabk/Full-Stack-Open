//effect hooks are used when fetching data from a server.
import { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from "./components/numbers"
import Filter from './components/filter'
import PersonForm from './components/personform'

const App = () => {
  //persons state
  const [persons, setPersons] = useState([]) 

  //controlled components
  const [newName, setNewName] = useState('') //new name
  const [newNumber, setNewNumber] = useState('') //new number
  const [search, setSearch] = useState('') //filter values

  //effect hooks
  useEffect( () => {
    axios
      //promise
      .get("http://localhost:3001/persons")
      //event handler to access the result of the operation
      .then( response => {
        console.log("response data:", response.data)
        /*stores the notes received from the server into the state a call
        to a state-updating function triggers the re-rendering of the component*/
        setPersons(response.data)
      })
  }, [])

  console.log("persons=",persons)

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