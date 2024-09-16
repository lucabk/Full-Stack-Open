//effect hooks are used when fetching data from a server.
import { useState, useEffect } from 'react'
import Numbers from "./components/numbers"
import Filter from './components/filter'
import PersonForm from './components/personform'
import phoneService from './services/numbers'
import Notification from './components/Notifications'

const App = () => {
  //persons state
  const [persons, setPersons] = useState([]) 

  //controlled components
  const [newName, setNewName] = useState('') //new name
  const [newNumber, setNewNumber] = useState('') //new number
  const [search, setSearch] = useState('') //filter values
  const [message, setMessage] = useState(null) //confirmation message

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
    //create new obj to update the state (not directly!)
    const newPersonObj = {
      name : newName,
      number : newNumber,
    }    
    //check if the name is not in the list
    if (!checkName(newName)){
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
          //show confirmation message for 5 sec
          setMessage(response.name)
          setTimeout(() => {
            setMessage(null)
          },5000)
        })
    }
    else{
      if(confirm(`${newPersonObj.name} is already added to phonebook, replace the old number with a new one?`)){
        const oldPersonObj = persons.find( person => person.name === newPersonObj.name)
        //PUT
        phoneService
          .update(oldPersonObj.id, newPersonObj)
          .then(response => {
            console.log("server PUT response:", response)
            //update state
            setPersons(persons.map( person => person.name !== oldPersonObj.name ? person : response))
            //show confirmation message for 5 sec
            setMessage(response.name)
            setTimeout(() => {
              setMessage(null)
            },5000)
          })
          //catch error while updating a deleted person's number
          .catch(error => {
            console.error(`Updating a removed element:`, error)
            //show error message for 5 sec
            setMessage("error"+newPersonObj.name)
            setTimeout(() => {
              setMessage(null)
            },5000)
            //Removing an already deleted name from the app's state
            setPersons(persons.filter( person => person.name !== newPersonObj.name))
          });
      }
    }
    //set empty values for the input elements    
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

  //event handler to delete numbers
  const handleDelete = (id) => () => {
    console.log("ID number to delete:", id)
    const personToDel = persons.find( person => person.id === id)
    if(confirm(`Delete ${personToDel.name}?`)){
      phoneService
        //DELETE
        .deleteNumber(id)
        .then(response => {
          console.log(`response after DELETE (note ${id})`, response)
          //updating state
          setPersons(persons.filter( person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
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
        {persons.map( person => 
          <Numbers key={person.id} person={person} search={search}
          handleDelete={handleDelete}/>)}
      </ul>     
    </div>
  )
}

export default App