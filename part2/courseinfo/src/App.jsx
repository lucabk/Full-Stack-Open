//title of the course
const Header = ({ title }) => <h2>{title}</h2>

//Tot number of exercises 
const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>


//display each course
const Content = ({ parts, title }) => {
  //compute the sum of ex
  const sum = parts.reduce( (count, act) => count+act.exercises,0)
  
  return(
    <div>
      <Header title={title}/>
      {parts.map( item => <Part key={item.id} part={item}/>)}
      <Total sum={sum}/>
    </div>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>


//handle each course in courses array
const Course = ({courses}) => courses.map( course => <Content key={course.id} parts={course.parts} title={course.name}/>)


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
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
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
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

  return (
    <>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </>
  )
}

export default App