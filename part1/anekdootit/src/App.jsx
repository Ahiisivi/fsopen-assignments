import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const VoteScore = ({votes}) => {
  return(
    <p>This anecdote has {votes} votes.</p>
  )
}

const App = () => {

  const [selected, setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // setting votesArr state
  const [votesArr, setVotesArr] = useState(Array(anecdotes.length).fill(0))
  
  // connecting votes array with selected anecdote
  const votes = votesArr[selected]
  
  const nextClick = () => {setSelected(Math.floor(Math.random()*anecdotes.length))}
  
  //voteClick copies votesArr and updates the array with the new vote
  const voteClick = () => {
    const copy = [...votesArr]
    copy[selected] += 1
    setVotesArr(copy)
    }

  // get the most amout of votes
  const mostVotes = Math.max(...votesArr)
  // find the corresponding index of the amount
  const pickMostVotes = votesArr.indexOf(mostVotes)

  console.log(pickMostVotes)
  console.log(votesArr)
  
  return (
    
    <div>
      <div>
      <p>{anecdotes[selected]}</p>
      <Button onClick={nextClick} text='Next anecdote' />
      <VoteScore votes={votes} />
      <Button onClick={voteClick} text='Vote +1' />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[pickMostVotes]}</p>
      </div>
    </div>
  )
}

export default App