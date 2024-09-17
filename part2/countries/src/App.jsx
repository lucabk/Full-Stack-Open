import { useState, useEffect } from "react"
import CountryForm from "./components/countryForm"
import Notification from "./components/notifications"
import axios from 'axios'

function App() {
  const [value, setValue] = useState('') //value of the input element
  const [country, setCountry] = useState(null) //country submitted by the form
  const [info, setInfo] = useState([]) 
  const [error, setError] = useState(null)

  //effect hook
  useEffect(()=>{
    console.log("inside effect hook, country =",country)
    //if the country is not NULL the API is queried
    if(country){
      console.log("querying the API...")
      //GET
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          console.log("server respose.data:", response.data)
          //saves the server's response in the "info" status variable
          setInfo(response.data)
        })
        .catch( error => {
          console.error("GET request Error:", error)
          setError(country) //set the error's value
          setTimeout(() => {
            setError(null)
          },5000)
          setValue("") //clear the input 
        })
    }
  },[country])
  /*When the country variable gets a new value, the application 
  fetches its info from the API in the effect function*/

  //input handler onChange
  const handleOnChange = (event) => {
    console.log("input value:",event.target.value)
    setValue(event.target.value) //update the state
  }
  //input handler onSubmit
  const handleOnSubmit = (event) => {
    event.preventDefault() //prevent reloading after clicking the button
    setCountry(value) // select the country to search
  }

  return (
    <>
      <h1>Countries</h1>

      <CountryForm 
        value={value} 
        onChange={handleOnChange} 
        onSubmit={handleOnSubmit}
      />
      <Notification message={error}/>
    </>
  )

}

export default App
