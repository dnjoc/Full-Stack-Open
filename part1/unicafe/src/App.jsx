import { useState } from 'react'
const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}
const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  );
};
const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  if (all > 0) {
    return(
      <>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(props.good - props.bad) / all} />
        <StatisticLine text="positive" value={(props.good / all) * 100 + "%"} />
      </>
    )
  }
  return(
    <p>No feedback given</p>
  )
}
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
   const handleClicks = (text) => {
     // segun el prop indicar cual constante se va a actualizar
   if (text == "good") {
     setGood(good + 1)
   } else if (text == "neutral") {
     setNeutral(neutral + 1)
    } else {
     setBad(bad + 1)
   }
  }
  // const handleClicks = () => setGood(good + 1)
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClicks("good")} text="good" />
      <Button handleClick={() => handleClicks("neutral")} text="neutral" />
      <Button handleClick={() => handleClicks("bad")} text="bad" />
      <h1>stadistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </>
  )
}

export default App