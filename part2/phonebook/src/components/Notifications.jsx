const Notification = ({message, error}) => {
    if (message == null && error == null)
        return null

    else if (error){
        return(
            <div className="error">
                Information of {error} has already been removed from the server
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