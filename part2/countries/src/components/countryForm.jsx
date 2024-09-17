const CountryForm = ({value, onChange, onSubmit}) => {
    return(
        <div>
            <form onSubmit={onSubmit}>
                find countries
                <input 
                    value={value}
                    onChange={onChange}
                />
                <button type="submit">search</button>
            </form>
        </div>
    )
}

export default CountryForm