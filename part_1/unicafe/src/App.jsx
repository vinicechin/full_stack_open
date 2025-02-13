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

function App() {
  const grades = ["Good", "Neutral", "Bad"];
  const [values, setValues] = useState([0, 0, 0]);

  function handleOnGradeClick(index) {
    const newValues = [...values];
    newValues[index] += 1;
    setValues(newValues);
  }

  function buildGradeStatistics() {
    const count = values.reduce((res, value) => {
      return res + value;
    });
    const divider = (count > 0 ? count : 1);
    return (
      <div>
        <p>All: {count}</p>
        <p>Average: {(values[0] - values[2]) / divider}</p>
        <p>Positive: {(values[0] / divider) * 100}%</p>
      </div>
    );
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
      <h1>Evaluation results:</h1>
      <div>
        {grades.map((grade, idx) => (
          <Grade key={idx} grade={grade} value={values[idx]} />
        ))}
        {buildGradeStatistics()}
      </div>
    </div>
  )
}

export default App;
