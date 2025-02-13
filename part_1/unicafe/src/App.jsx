import { useState } from "react";

function StatisticLine(props) {
  return (
    <p>
      {props.text}: {props.value}
    </p>
  );
}

function Statistics(props) {
  const count = props.values.reduce((res, value) => {
    return res + value;
  });

  return (
    <>
      <h1>Evaluation results:</h1>
      {count > 0 ? (
        <>
          {props.grades.map((grade, idx) => (
            <StatisticLine key={idx} text={grade} value={props.values[idx]} />
          ))}
          <StatisticLine text={"All"} value={count} />
          <StatisticLine text={"Average"} value={(props.values[0] - props.values[2]) / count} />
          <StatisticLine text={"Positive"} value={`${(props.values[0] / count) * 100}%`} />
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
}

function Button(props) {
  function handleClick() {
    props.onClick(props.index);
  }

  return <button onClick={handleClick}>{props.text}</button>;
}

function App() {
  const grades = ["Good", "Neutral", "Bad"];
  const [values, setValues] = useState([0, 0, 0]);

  function handleOnGradeClick(index) {
    const newValues = [...values];
    newValues[index] += 1;
    setValues(newValues);
  }

  return (
    <div>
      <h1>Give us your feedback:</h1>
      <div>
        {grades.map((grade, idx) => (
          <Button
            key={idx}
            index={idx}
            text={grade}
            onClick={handleOnGradeClick}
          >
            {grade}
          </Button>
        ))}
      </div>
      {<Statistics grades={grades} values={values} />}
    </div>
  );
}

export default App;
