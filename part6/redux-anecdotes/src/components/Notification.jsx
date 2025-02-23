import { useSelector } from 'react-redux'

const Notification = () => {
  //state
  const notification = useSelector(({ filter }) => {
    if(filter!==""){
      return filter
    }
  })
  //CSS
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification