import { useState, useEffect } from "react";
import axios from "axios";
import ContactService from "./services/contacts";

import { ContactForm } from "./components/ContactForm";
import { Search } from "./components/Search";
import { PhonebookList } from "./components/PhonebookList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    ContactService.getAll().then((initContacts) => {
      setPersons(initContacts);
    });
  }, []);

  function handleOnAddClick(newName, newPhone) {
    if (
      newName.length > 0 &&
      !persons.find((person) => person.name === newName)
    ) {
      ContactService.create({ name: newName, phone: newPhone }).then(
        (newContact) => {
          setPersons(persons.concat(newContact));
          setNewName("");
          setNewPhone("");
        }
      );
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
