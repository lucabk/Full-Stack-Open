import { useState } from 'react'

const Button = ({onClick, text}) =>{
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const Statistics = ({good, neutral, bad}) => {
  //statistical functions
  const sum = () => good+neutral+bad
  const avg = () => (good+bad*(-1))/sum()
  const pos = () => good*100/sum()

  //conditional rendering
  if (good===0 && neutral===0 && bad===0){
    return(
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>

        <StatisticLine text="all" value={sum()}/>
        <StatisticLine text="average" value={avg()}/>
        <StatisticLine text="positive" value={pos()+" %"}/>
        </tbody>
      </table>
    </div>

  )
}

// displays a single statistic
const StatisticLine = ({text,value}) => {
  return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}


const App = () => {
  //buttons  state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //event handler
  const clickHandlerGood = (newValue) => () => setGood(newValue)
  const clickHandlerNeutral = (newValue) => () => setNeutral(newValue)
  const clickHandlerBad = (newValue) => () => setBad(newValue)  


  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={clickHandlerGood(good+1)} text="good"/>
      <Button onClick={clickHandlerNeutral(neutral+1)} text="neutral"/>
      <Button onClick={clickHandlerBad(bad+1)} text="bad"/>
      
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )
}

export default App