const Header = (props) => {
  console.log("course component props:", props)

  return(
    <div>
      <h1>{props.course["name"]}</h1>
    </div>
  )
}

const Content = (props) => {

  return(
    <div>
      <Part part={props.course.parts[0]}/>
      <Part part={props.course.parts[1]}/>
      <Part part={props.course.parts[2]}/>
    </div>
  )
}

const Part = (props) => {
  console.log("Part component props", props)

  return(
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {

  return(
    <div>
      <p>Number of exercises {props.course.parts.reduce((prev, act)=>prev+act.exercises,0)}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course}/>

      <Content course={course}/>
    
      <Total course={course}/>
    </>
  )
}

export default App