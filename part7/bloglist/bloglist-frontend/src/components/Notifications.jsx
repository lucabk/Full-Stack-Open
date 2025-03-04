import { useContext } from 'react'
import NotificationContext from '../context/notificationContext'

const Notification = () => {
  const [notification] = useContext(NotificationContext)
  console.log('notification: ',notification)

  const className = notification.type === 'success' ? 'success' : 'error'

  return (
    <>
      {notification.msg.length>1 && (
        <div className={className}>
          {notification.msg}
        </div>
      )}
    </>
  )


}

export default Notification