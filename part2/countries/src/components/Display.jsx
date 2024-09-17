const Display = ({matching, search}) => {
   console.log("Display matching:",matching," search:",search)

   /*When there is only one country matching the query, then the basic 
   data of the country  are shown*/
   if (matching.length === 1){
      const country = matching[0]
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
         </div>
      )
   }

   /*If there are ten or fewer countries, but more than one, 
   then all countries matching the query are shown*/
   else if (matching.length <= 10 &&  matching.length > 1){
      return(
         <div>
            {matching.map( country =>
               <DisplayCountry key={country.cca3} countryName={country.name.common}/>
            )}
         </div>
      )
   }

   //if {search}===""
   else if (search === "") return null

   /*If there are too many (over 10) countries that match the query, 
   then the user is prompted to make their query more specific*/
   else if (matching.length > 10) return("Too many matches, specific another")
   
   return <div>no country found</div>
}

const DisplayCountry = ({countryName}) => {
   console.log("DisplayCountrycountryName =",countryName)
   return(
      <div>
         {countryName}
      </div>
   )
}

export default Display