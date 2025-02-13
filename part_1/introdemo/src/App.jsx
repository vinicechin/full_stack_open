function Header(props) {
  return <h1>{props.text}</h1>;
}

function Part(props) {
  return (
    <p>
      {props.label} {props.value}
    </p>
  );
}

function Content(props) {
  return (
    <>
      {props.parts.map((part, idx) => {
        return <Part key={idx} label={part.name} value={part.exercises} />;
      })}
    </>
  );
}

function Total(props) {
  return <p>Number of exercises {props.value}</p>;
}

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header text={course} />
      <Content parts={parts} />
      <Total
        value={parts.reduce((total, part) => {
          return total + part.exercises;
        }, 0)}
      />
    </div>
  );
};

export default App;
