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
          <Part key={idx} label={part.label} value={part.value} />
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header text={course} />
      <Content
        parts={[
          { label: part1, value: exercises1 },
          { label: part2, value: exercises2 },
          { label: part3, value: exercises3 },
        ]}
      />
      <Total value={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App