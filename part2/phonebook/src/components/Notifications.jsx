const Notification = ({message}) => {
    if (message == null)
        return null

    return (
        <div className="message">
            Added {message}
        </div>
    )
}

export default Notification