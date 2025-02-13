import { useState } from 'react';

function Grade(props) {
  return (
    <div>
      <p>
        {props.grade}: {props.value}
      </p>
    </div>
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
        <div>
          {props.grades.map((grade, idx) => (
            <Grade key={idx} grade={grade} value={props.values[idx]} />
          ))}
          <div>
            <p>All: {count}</p>
            <p>Average: {(props.values[0] - props.values[2]) / count}</p>
            <p>Positive: {(props.values[0] / count) * 100}%</p>
          </div>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  )
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
          <button key={idx} onClick={() => {
            handleOnGradeClick(idx);
          }}>{grade}</button>
        ))}
      </div>
      {<Statistics grades={grades} values={values} />}
    </div>
  )
}

export default App;
