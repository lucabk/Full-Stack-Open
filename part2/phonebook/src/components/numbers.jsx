//display the names
const Numbers = ({person, search}) => {
    if (search === ""){
        return(
            <div>
                <li>
                    {person.name} {person.number}
                </li>
            </div>
        )    
    }
    //search for names
    else if (person.name.toLowerCase().includes(search.toLowerCase()) ){
        return(
            <div>
                <li>
                    {person.name} {person.number}
                </li>
            </div>
        )        
    }
    // return if there is no match found
    else   
        return    
}

export default Numbers