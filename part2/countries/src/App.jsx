import { useState, useEffect } from "react"
import CountryForm from "./components/countryForm"
import Display from "./components/Display"
import axios from 'axios'

//API KEY
const apiKey = import.meta.env.VITE_API_KEY


const  App = () =>  {
  const [search, setSearch] = useState("") //value of the input
  const [allCountries, setAllCountries] = useState([]) //response of server 
  const [matching, setMatching] = useState([]) //countries selected
  const [cityWeather, setCityWeather] = useState(null) //city to query API
  const [weather, setWeather] = useState({}) //weather info

  //effect hook to retrieve all the countries
  useEffect(()=>{
    console.log("querying the restcountries API...")
    //GET
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        console.log("restcountries API respose.data:", response.data)
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

  //OpenWeather API effect hook
  useEffect(()=>{
    if(cityWeather){
      console.log("querying OpenWeather API...")
      axios
        //GET from Geocoding API
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityWeather}&limit=1&appid=${apiKey}`)
        .then(response => {
          //coordinates
          console.log("Geocoding API response.data:",response.data)
          const {lat, lon} = response.data[0]
          console.log("Coordinates:", lat, lon);
          //GET OpenWeather API
          return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        })
        .then( response => {
          console.log("Weather API response.data:",response.data)
          //destructuring 
          const {
            main: { temp },
            wind: { speed },
            weather: [{ icon }]
          } = response.data;
          
          console.log("Temperature:", temp);
          console.log("Wind Speed:", speed);
          console.log("Weather Icon:", icon);

          //create new obj
          const newWeather = {
            temp : (temp-273.15).toFixed(2),
            wind : speed,
            icon : icon
          }          
          //update state
          setWeather(newWeather)

        })
        .catch( error => {
          console.log("API error",error)
        })
    }
  },[cityWeather])

  //input handler onChange
  const handleOnChange = (event) => {
    console.log("input value:",event.target.value)
    setSearch(event.target.value) //update the state of input element
  }

  //handle onClick button
  const handleOnClick = (obj) => () => {
    //set the new value for matching
    setMatching([obj])
  }

  // change city for OpenWeather API
  const handleWeather = (capital)  => {
    setCityWeather(capital)
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
        handleWeather={handleWeather}
        weather={weather}
        />
    </>
  )

}

export default App
