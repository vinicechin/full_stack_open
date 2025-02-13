function Header(props) {
  return (
    <h1>{props.text}</h1>
  );
}

function Part(props) {
  return (
    <p>
      {props.label} {props.value}
    </p>
  )
}

function Content(props) {
  return (
    <>
      {props.parts.map((part, idx) => {
        return (
          <Part key={idx} label={part.name} value={part.exercises} />
        )
      })}
    </>
  );
}

function Total(props) {
  return (
    <p>Number of exercises {props.value}</p>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header text={course} />
      <Content
        parts={[part1, part2, part3]}
      />
      <Total value={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App