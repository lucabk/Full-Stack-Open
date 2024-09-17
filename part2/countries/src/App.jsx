import { useState, useEffect } from "react"
import CountryForm from "./components/countryForm"
import Display from "./components/Display"
import axios from 'axios'

const  App = () =>  {
  const [search, setSearch] = useState("") //value of the input
  const [allCountries, setAllCountries] = useState([]) //response of server 
  const [matching, setMatching] = useState([]) //countries selected

  //effect hook
  useEffect(()=>{
    console.log("querying the restcountries API...")
    //GET
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        console.log("API respose.data:", response.data)
        //saves the server's response in the "allCountries" status variable
        setAllCountries(response.data)
      })
      .catch( error => {
        console.error("GET request Error",error)
      })
  },[])
  
  // Update matching countries whenever the `search` input changes
  useEffect(()=>{
    //function to fill the matching countries with the input value
    const newMatching = allCountries.filter( country => 
      country.name.common.toLowerCase().includes(search.toLowerCase()))
    //set matching countries
    setMatching(newMatching) 
    console.log("effect hook: matching...")
  },[search])

  //input handler onChange
  const handleOnChange = (event) => {
    console.log("input value:",event.target.value)
    setSearch(event.target.value) //update the state of input element
  }

  //handle onClick button
  const handleOnClick = (obj) => () => {
    setMatching([obj])
  }

  return (
    <>
      <CountryForm 
        value={search} 
        onChange={handleOnChange} 
      />
      <Display 
        matching={matching} 
        search={search}
        handleOnClick={handleOnClick}
        />
    </>
  )

}

export default App
