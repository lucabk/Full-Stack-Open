const Notification = ({message}) => {
    if (message === null)
        return null

    return (
        <div className="error">
            No information found about {message}
        </div>
    )
}
export default Notification