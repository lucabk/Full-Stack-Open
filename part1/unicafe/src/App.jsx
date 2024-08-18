// the file imports the useState function
import { useState } from 'react'

//Component
const App = () => {

  /*The function returns an array that contains two items:
  The counter variable is assigned the initial value of state, which is zero. 
  The variable setCounter is assigned a function that will be used to modify the state.
  When the state modifying function setCounter is called, React re-renders the 
  component which means that the function body of the component function gets re-executed*/
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  //Event Handlers
  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => { 
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }


  /*The event handler is passed to the Button component through the onClick prop. 
  The name of the prop itself is not that significant, but our naming choice 
  wasn't completely random.*/
  return (
    <div>
      <Display counter={counter}/>

      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      />  
    </div>
  )
}


/*let's place the application's state in the App component and pass 
it down to the Display component through props:*/
const Display = ({ counter }) => <div>{counter}</div>


/* let's make a Button component for the buttons of our application. 
We have to pass the event handler as well as the title of the button 
through the component's props:*/
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
/*When one of the buttons is clicked, the event handler is executed. 
The event handler changes the state of the App component with the setCounter 
function. Calling a function that changes the state causes the component to re-render.*/

export default App