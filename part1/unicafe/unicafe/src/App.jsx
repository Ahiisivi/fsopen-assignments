import { useState } from 'react'

const Header = () => {
  return (
    <div>
      <h1>Give feedback!</h1>
      <br />
    </div>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <h2>Statistics:</h2>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
    </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const goodClick = () => { setGood(good + 1) }
  const badClick = () => { setBad(bad + 1) }
  const neutralClick = () => { setNeutral(neutral + 1)}

  return (
    <div>
      <Header />
      <Button onClick={goodClick} text='Good' />
      <Button onClick={neutralClick} text='Neutral' />
      <Button onClick={badClick} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App