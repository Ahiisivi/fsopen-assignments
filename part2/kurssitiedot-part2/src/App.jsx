
const Header = (props) => {
console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
      <br />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>Osa: {props.parts} / tehtävien määrä: {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part parts={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part parts={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part parts={props.parts[2].name} exercises={props.parts[2].exercises}/>
      <br />
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Tehtävien yhteismäärä: {props.total}</p>
  )
}

const Course = ( {course} ) => {
  
  const totalWithReduce = course.parts.reduce((partsSum, partValue) => {
    return partsSum + partValue.exercises
    }, 0)
  
    console.log(totalWithReduce)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={totalWithReduce} />
      
    </div>
    
  )
}



const App = () => {
  const course = {
    name:  'Half Stack application development',
    id: 1,
    parts: [
    
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },

      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },

      {
        name: 'State of component',
        exercises: 14,
        id: 3
      }
    ]
   }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App