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
  function buildGradeStatistics() {
    const count = props.values.reduce((res, value) => {
      return res + value;
    });
    const divider = (count > 0 ? count : 1);
    return (
      <div>
        <p>All: {count}</p>
        <p>Average: {(props.values[0] - props.values[2]) / divider}</p>
        <p>Positive: {(props.values[0] / divider) * 100}%</p>
      </div>
    );
  }

  return (
    <>
      <h1>Evaluation results:</h1>
      <div>
        {props.grades.map((grade, idx) => (
          <Grade key={idx} grade={grade} value={props.values[idx]} />
        ))}
        {buildGradeStatistics()}
      </div>
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
