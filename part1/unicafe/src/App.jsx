import { useState } from 'react'

const Button = () =>{

}


const Statistics = ({good, neutral, bad}) => {
  //statistical functions
  const sum = () => good+neutral+bad
  const avg = () => (good+bad*(-1))/sum()
  const pos = () => good*100/sum()
  
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

      <p>all {sum()}</p>
      <p>average {avg()}</p>
      <p>positive {pos()} %</p>
    </div>

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
      <button onClick={clickHandlerGood(good+1)}>good</button>
      <button onClick={clickHandlerNeutral(neutral+1)}>neutral</button>
      <button onClick={clickHandlerBad(bad+1)}>bad</button>
      
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )
}

export default App