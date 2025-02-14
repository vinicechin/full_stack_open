import { useState } from "react";

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

function Statistics({ values, grades }) {
  const count = values.reduce((res, value) => {
    return res + value;
  });

  return (
    <>
      <h1>Evaluation results:</h1>
      {count > 0 ? (
        <table>
          <tbody>
            {grades.map((grade, idx) => (
              <StatisticLine key={idx} text={grade} value={values[idx]} />
            ))}
            <StatisticLine text={"All"} value={count} />
            <StatisticLine text={"Average"} value={(values[0] - values[2]) / count} />
            <StatisticLine text={"Positive"} value={`${(values[0] / count) * 100}%`} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
}

function Button({ index, text, onClick }) {
  return <button onClick={() => onClick(index)}>{text}</button>;
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
