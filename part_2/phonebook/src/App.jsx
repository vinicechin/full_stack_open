import { useState, useEffect } from "react";
import axios from 'axios'

import { ContactForm } from "./components/ContactForm";
import { Search } from "./components/Search";
import { PhonebookList } from "./components/PhonebookList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  function handleOnAddClick(newName, newPhone) {
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
      <ContactForm handleOnAddClick={handleOnAddClick} />
      <br />
      <Search
        value={searchValue}
        onChange={handleOnSearchValueChange}
      />
      <h2>Numbers</h2>
      <PhonebookList persons={persons.filter(filterPersons)} />
    </div>
  );
};

export default App;
