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
    else if (person.name.toLowerCase().includes(search.toLowerCase()) ){
        return(
            <div>
                <li>
                    {person.name} {person.number}
                </li>
            </div>
        )        
    }
    else   
        return    
}

export default Numbers