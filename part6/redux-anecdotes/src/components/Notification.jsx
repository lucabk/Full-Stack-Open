import { useSelector } from 'react-redux'

const Notification = () => {
  //get notification state
  const notification = useSelector(({ notification }) => {
    if(notification){
      return notification
    }
  })
  //CSS
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <>
      {notification && notification.length > 1 && (
        <div style={style}>
          {notification}
        </div>
      )}
    </>
  )
}

export default Notification