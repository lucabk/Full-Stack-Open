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

export default Course