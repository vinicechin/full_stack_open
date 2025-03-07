import { useState } from "react";
import { ContactForm } from "./components/ContactForm";
import { Search } from "./components/Search";
import { PhonebookList } from "./components/PhonebookList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [searchValue, setSearchValue] = useState("");

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
        searchValue={searchValue}
        handleOnSearchValueChange={handleOnSearchValueChange}
      />
      <h2>Numbers</h2>
      <PhonebookList persons={persons.filter(filterPersons)} />
    </div>
  );
};

export default App;
