import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  function handleOnNameChange(e) {
    setNewName(e.target.value);
  }

  function handleOnAddClick(e) {
    e.preventDefault();

    if (newName.length > 0 && !persons.find(person => person.name === newName)) {
      setPersons(persons.concat({ name: newName }));
    } else {
      alert(`${newName} already exist in your contacts`);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleOnNameChange} />
        </div>
        <div>
          <button
            disabled={newName.length === 0}
            type="submit"
            onClick={handleOnAddClick}
          >
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
