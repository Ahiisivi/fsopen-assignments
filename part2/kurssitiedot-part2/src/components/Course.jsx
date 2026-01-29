
const Header = (props) => {
console.log(props)
  return (
    <div>
      <h2>{props.course}</h2>
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

const Content = ( {parts} ) => {
  return (
    // changed content from hardcoded to dynamic with map()
    // note to self: use key insted of id={part.id}
    <div>
      {parts.map(part => 
        <Part key={part.id} parts={part.name} exercises={part.exercises} />
      )}
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
      <h3><Total total={totalWithReduce} /></h3>
      <br />
      
    </div>
    
  )
}

export default Course