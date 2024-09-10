import { useState } from 'react'


const Button = ({arr, index, onCLicknextAn, vote, onCLickVote}) =>{
  //display new anecdotes
  return(
    <div>
      <p>{arr[index]}</p>
      <Vote vote={vote} index={index} onCLickVote={onCLickVote}/>
      <br></br>
      <button onClick={onCLicknextAn}>
        next anecdote
      </button>
    </div>

  )
}

const Vote = ({vote, index, onCLickVote}) => {
  //update the votes with the button
  console.log("vote",vote)
  console.log("index",index)

  return(
    <div>
      <p>has {vote[index]} votes</p>
      <button onClick={onCLickVote(index)}>
        vote
      </button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  //State
  const [selected, setSelected] = useState(0) //index of anecdote
  //complex state: array of votes for each anecdote initializated to zero
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))

  //Event handler
  //change anectode
  const clickHandlerAn = () => {
    //will give you a random integer between 0 and the length of the array, inclusive:
    let index =  Math.floor(Math.random() * anecdotes.length) 
    setSelected(index)
  }
  //add vote to anectodes array
  const clickHandlerVote = (index) => () => {
    const voteCopy = [...vote]
    voteCopy[index]++
    setVote(voteCopy)
  }

  return (
    <div>
      <Button 
        arr={anecdotes} 
        index={selected} 
        onCLicknextAn={clickHandlerAn}

        vote={vote}
        onCLickVote={clickHandlerVote}
        />
    </div>
  )
}

export default App