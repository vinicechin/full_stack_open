import { useState, useEffect } from "react";
import axios from "axios";

import { ContactForm } from "./components/ContactForm";
import { Search } from "./components/Search";
import { PhonebookList } from "./components/PhonebookList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  function handleOnAddClick(newName, newPhone) {
    if (
      newName.length > 0 &&
      !persons.find((person) => person.name === newName)
    ) {
      const newContact = { name: newName, phone: newPhone };
      axios
        .post("http://localhost:3001/persons", newContact)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewPhone('');
        });
    } else {
      alert(`${newName} already exist in your contacts`);
    }
  }

  function handleOnSearchValueChange(e) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  function filterPersons(person) {
    return person.name.toLowerCase().includes(searchValue.toLowerCase());
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm
        handleOnAddClick={handleOnAddClick}
        newName={newName}
        newPhone={newPhone}
        setNewName={setNewName}
        setNewPhone={setNewPhone}
      />
      <br />
      <Search value={searchValue} onChange={handleOnSearchValueChange} />
      <h2>Numbers</h2>
      <PhonebookList persons={persons.filter(filterPersons)} />
    </div>
  );
};

export default App;
