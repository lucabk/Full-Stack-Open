import { useContext } from "react"
import NotificationContext from "../notificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notificationValue] = useContext(NotificationContext)

  return (
    <>
      {notificationValue.length > 1 && (
        <div style={style}>
          {notificationValue}
        </div>
      )}
    </>
  )
}

export default Notification
