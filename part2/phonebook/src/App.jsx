//effect hooks are used when fetching data from a server.
import { useState, useEffect } from 'react'
import Numbers from "./components/numbers"
import Filter from './components/filter'
import PersonForm from './components/personform'
import phoneService from './services/numbers'

const App = () => {
  //persons state
  const [persons, setPersons] = useState([]) 

  //controlled components
  const [newName, setNewName] = useState('') //new name
  const [newNumber, setNewNumber] = useState('') //new number
  const [search, setSearch] = useState('') //filter values

  //effect hooks
  useEffect( () => {
    phoneService
      //GET
      .getAll()
      //event handler to access the result of the operation
      .then( response => {
        console.log("server GET response:", response)
        /*stores the notes received from the server into the state a call
        to a state-updating function triggers the re-rendering of the component*/
        setPersons(response)
      })
  }, [])


  //event hander for submit
  const addNumber = (event) => {
    //prevent reloading after clicking the button
    event.preventDefault()
    //check if the name is already in the list
    if (!checkName(newName)){
      //create new obj to update the state (not directly!)
      const newPersonObj = {
        name : newName,
        number : newNumber,
        id : String(persons.length+1)
      }
      //POST
    /*Since the data we sent in the POST request was a JavaScript object, 
    axios automatically knew to set the appropriate application/json 
    value for the Content-Type header.*/
      phoneService
        //The object is sent to the server using the axios post method.
        .create(newPersonObj)
         /*The registered event handler logs the response that is sent 
        back from the server to the console*/
        .then(response => {
          console.log("server POST response", response)
          //update the state of the App component to render the new note
          setPersons(persons.concat(response))
          console.log("persons length",persons.length)
        })
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

  //return undefined if there is not a duplicate
  const checkName = name => persons.find( person => person.name === name)


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