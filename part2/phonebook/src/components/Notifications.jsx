const Notification = ({message}) => {
    if (message == null)
        return null

    else if (message.includes("error")){
        const name = message.slice(5,message.length)
        console.log(name)
        return(
            <div className="error">
                Information of {name} has already been removed from the server
            </div>
        )
    }

    return (
        <div className="message">
            Added {message}
        </div>
    )
}

export default Notification