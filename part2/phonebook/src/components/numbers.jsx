//display the names
const Numbers = ({person}) => {
    return(
        <div>
            <li>
                {person.name} {person.number}
            </li>
        </div>
    )
}

export default Numbers