import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "123456789" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  function handleOnNameChange(e) {
    setNewName(e.target.value);
  }

  function handleOnPhoneChange(e) {
    setNewPhone(e.target.value);
  }

  function handleOnAddClick(e) {
    e.preventDefault();

    if (
      newName.length > 0 &&
      !persons.find((person) => person.name === newName)
    ) {
      setPersons(persons.concat({ name: newName, phone: newPhone }));
    } else {
      alert(`${newName} already exist in your contacts`);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <table>
          <tbody>
            <tr>
              <td>name</td>
              <td>
                <input value={newName} onChange={handleOnNameChange} />
              </td>
            </tr>
            <tr>
              <td>phone</td>
              <td>
                <input value={newPhone} onChange={handleOnPhoneChange} />
              </td>
            </tr>
          </tbody>
        </table>
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
      <table>
        <tbody>
          {persons.map((person) => (
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
