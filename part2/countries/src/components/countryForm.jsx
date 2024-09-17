const CountryForm = ({value, onChange}) => {
    return(
        <div>
            <form>
                find countries
                <input 
                    value={value}
                    onChange={onChange}
                />
            </form>
        </div>
    )
}

export default CountryForm