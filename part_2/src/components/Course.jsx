
function Header({ text }) {
  return <h1>{text}</h1>;
}

function Part({ label, value }) {
  return (
    <p>
      {label} {value}
    </p>
  );
}

function Content({ parts }) {
  return (
    <>
      {parts.map((part) => {
        return <Part key={part.id} label={part.name} value={part.exercises} />;
      })}
    </>
  );
}

function Total({ value }) {
  return <p>Number of exercises {value}</p>;
}

export function Course({ courseInfo }) {
  return (
    <div>
      <Header text={courseInfo.name} />
      <Content parts={courseInfo.parts} />
      <Total
        value={courseInfo.parts.reduce((total, part) => {
          return total + part.exercises;
        }, 0)}
      />
    </div>
  );
}