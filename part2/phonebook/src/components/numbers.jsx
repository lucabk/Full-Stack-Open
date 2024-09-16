//display the names
const Numbers = ({person, search, handleDelete}) => {
    if (search === ""){
        return(
            <div>
                <li>
                    {person.name} {person.number}
                    <button onClick={handleDelete(person.id)}>delete</button>
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
                    <button onClick={handleDelete(person.id)}>delete</button>
                </li>
            </div>
        )        
    }
    // return if there is no match found
    else   
        return    
}

export default Numbers