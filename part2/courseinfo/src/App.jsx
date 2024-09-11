//Half Stack application development
const Header = ({ course }) => <h1>{course}</h1>


//Number of exercises 31
const Total = ({ sum }) => <p>Number of exercises {sum}</p>


//single course
const Content = ({ parts }) => parts.map( item => <Part key={item.id} part={item}/>)


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>


const Course = ({course}) => {
  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
        name: 'State of a variable',
        exercises: 13,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App