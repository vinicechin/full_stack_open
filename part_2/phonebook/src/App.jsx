import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchValue, setSearchValue] = useState("");

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

  function handleOnSearchValueChange(e) {
    setSearchValue(e.target.value);
  }

  function filterPersons(person) {
    return person.name.toLowerCase().includes(searchValue);
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
      <br />
      <div>
        Search <input value={searchValue} onChange={handleOnSearchValueChange} />
      </div>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.filter(filterPersons).map((person) => (
            <tr key={person.id}>
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
