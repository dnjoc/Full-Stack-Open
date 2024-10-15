const Header = ({course}) => {
    console.log(course)
    return (
      <>
        <h2>{course}</h2>
      </>
    )
  }
  const Part = (props) => {
    console.log(props)
    return (
      <>
        <p>
          {props.part} {props.exercises}
        </p>
      </>
    )
  }
  const Content = ({parts}) => {
    console.log(parts)
    return (
      <>
        {parts.map(parte => 
            <Part key={parte.id} part={parte.name} exercises={parte.exercises} />
        )}
      </>
    )
  }
  const Total = ({parts}) => {
    const element = parts.reduce((acc, parte) => acc + parte.exercises, 0);
    return (
      <>
        <p><b>Number of exercises {element}</b></p>
      </>
    )
  }
  const Course = ({course}) => {
    console.log(course)
    return(
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  export default Course