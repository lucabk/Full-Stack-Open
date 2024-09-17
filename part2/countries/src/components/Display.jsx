import { useEffect } from "react"

const Display = ({matching, search, handleOnClick,handleWeather,weather}) => {
   console.log("Display matching:",matching," search:",search)

   /*When there is only one country matching the query, then the basic 
   data of the country  are shown*/
   if (matching.length === 1){
      const country = matching[0]
      return (
         <DisplayOneCountry 
            country={country} 
            handleWeather={handleWeather}
            weather={weather}
         />
      )
   }

   /*If there are ten or fewer countries, but more than one, 
   then all countries matching the query are shown*/
   else if (matching.length <= 10 &&  matching.length > 1){
      return(
         <div>
            {matching.map( country =>
               <DisplayCountries 
                  key={country.cca3} 
                  country={country}
                  handleOnClick={handleOnClick}
                  />
            )}
         </div>
      )
   }

   //if {search}===""
   else if (search === "") return null

   /*If there are too many (over 10) countries that match the query, 
   then the user is prompted to make their query more specific*/
   else if (matching.length > 10) return("Too many matches, specific another")
   
  //typo
   return <div>no country found</div>
}

//display less than 10 countries
const DisplayCountries = ({country, handleOnClick}) => {
   const countryName = country.name.common
   console.log("DisplayCountrycountryName =",countryName)
   return(
      <div>
         {countryName} <button onClick={handleOnClick(country)}>show</button>
      </div>
   )
}


//display a single country
const DisplayOneCountry = ({country, handleWeather,weather}) => {
   useEffect(() => {
      handleWeather(country.capital)
   }, [country.capital]) 
   const icon = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

   return(
      <div>
         <h2>{country.name.common}</h2>
         capital {country.capital}<br/>
         area {country.area}<br/><br/>
         <strong>languages:</strong>
         <ul>
            {Object.entries(country.languages).map(([key, value]) => 
            (<li key={key}>{value}</li>))}
         </ul>
         <img className="flag" alt={country.flags.alt} src={country.flags.png}></img>
         <h3>Weather in {country.capital}</h3>
         temperature {weather.temp} Celsius <br/>
         <img src={icon} alt="weather icon"></img><br/>
         wind {weather.wind} m/s
      </div>
   )
}

export default Display