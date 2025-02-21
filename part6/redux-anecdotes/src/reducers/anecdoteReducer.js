const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'VOTE': {
      console.log("dispatcher vote")
      // anectode id to change 
      const id = action.payload
      // anectode obj to change
      const anecdoteToVote = state.find( a => a.id === id)
      // anectode obj changed
      const anecdoteVoted = {...anecdoteToVote, votes:anecdoteToVote.votes+1}
      // new state
      const newAnectodes = state.map( a => a.id !== id ? a : anecdoteVoted)  
      return newAnectodes
    }

    case 'NEW_ANECTODE': {
      return state.concat(action.payload)
    }

    default:
      return state 
  }
}

//action creators:
//1.add a vote
export const addVote = (id) => {
  return {
    type : "VOTE",
    payload : id
  }
}
//2.create new anectode
export const addNewAnectode = (value) => {
  return {
    type : "NEW_ANECTODE",
    payload : {
      content : value,
      id : getId(),
      votes : 0
    }
  }
}
export default reducer