import Course from './components/Course'

const App = () => {
  const courses = [
    {
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
   },
   {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

// app now loops through courses using map
  return (
    <div>
      <div><h1>Web Development curriculum</h1></div>
      <div>
      {courses.map( course => <Course key={course.id} course={course} />
      )} </div>
    </div>
  )
}

export default App