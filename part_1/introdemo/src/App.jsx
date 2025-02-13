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
  const grades = ["good", "neutral", "bad"];
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
      <h1>Evaluation results:</h1>
      <div>
        {grades.map((grade, idx) => (
          <Grade key={idx} grade={grade} value={values[idx]} />
        ))}
      </div>
    </div>
  )
}

export default App;
