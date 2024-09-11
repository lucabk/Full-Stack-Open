//Half Stack application development
const Header = ({ course }) => <h1>{course}</h1>


//Tot number of exercises 
const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>


//show courses
const Content = ({ parts }) => parts.map( item => <Part key={item.id} part={item}/>)

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>


const Course = ({course}) => {
  //compute the sum of ex
  const arr = course.parts
  const sum = arr.reduce( (cont, act) => cont+act.exercises,0)

  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={sum}/>
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
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App