import { useState } from 'react'

const Header = () => {
  return (
    <div>
      <h1>Give feedback!</h1>
      <br />
    </div>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total, average, posPercent}) => {

 
  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <h4>No feedback given</h4>
      </div>
      
    )
  } else

    return (
      <div>
        <h2>Statistics</h2>
        <table>
            <tbody>
              <StatisticsLine text="Good" value={good} />
              <StatisticsLine text="Neutral" value={neutral} />
              <StatisticsLine text="Bad" value={bad} />
              <StatisticsLine text="Total" value={total} />
              <StatisticsLine text="Average" value={average.toFixed(1)} />
              <StatisticsLine text="Positive" value={`${posPercent.toFixed(1)} %`} />
          </tbody>
        </table>
      </div>
    )
}

const Button = ({ onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const scores = {
    good: 1, neutral: 0, bad: -1
  }

  const score = good * scores.good + neutral * scores.neutral + bad * scores.bad
  const average = total === 0 ? 0 : score / total
  const posPercent = total === 0 ? 0 : good / total * 100

  const goodClick = () => { setGood(prevGood => prevGood + 1) }
  const badClick = () => { setBad(prevBad => prevBad + 1) }
  const neutralClick = () => { setNeutral(prevNeutral => prevNeutral + 1)}
  const resetClick = () => {setGood(0), setBad(0), setNeutral(0)}

  return (
    <div>
      <Header />
      <Button onClick={goodClick} text='Good' />
      <Button onClick={neutralClick} text='Neutral' />
      <Button onClick={badClick} text='Bad' />
      <Button onClick={resetClick} text='Reset' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} posPercent={posPercent}/>

    </div>
  )
}

export default App