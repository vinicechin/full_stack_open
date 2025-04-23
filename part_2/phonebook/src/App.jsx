import { useState, useEffect } from "react";
import axios from "axios";
import ContactService from "./services/contacts";

import { ContactForm } from "./components/ContactForm";
import { Search } from "./components/Search";
import { PhonebookList } from "./components/PhonebookList";
import { Toast } from "./components/Toast";

import '../index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [toastClass, setToastClass] = useState("success");

  useEffect(() => {
    ContactService.getAll().then((initContacts) => {
      setPersons(initContacts);
    });
  }, []);

  function handleOnAddClick(newName, newPhone) {
    if (newName.length > 0) {
      let update = false;

      const oldPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
      if (oldPerson != null) {
        update = window.confirm(`Are you sure you want to update the contact for ${oldPerson.name}?`);
      }

      if (update) {
        ContactService.update(oldPerson.id, { name: newName, phone: newPhone }).then(
          (newContact) => {
            setPersons(persons.map(p => p.id === oldPerson.id ? newContact : p));
            
            setToastClass("success");
            setToastMessage(`Updated ${newName} contact info.`);
            setTimeout(() => {
              setToastMessage(null)
            }, 3000);

            setNewName("");
            setNewPhone("");
          }
        );
      } else {
        ContactService.create({ name: newName, phone: newPhone }).then(
          (newContact) => {
            setPersons(persons.concat(newContact));
            
            setToastClass("success");
            setToastMessage(`Added ${newName} to contacts.`);
            setTimeout(() => {
              setToastMessage(null)
            }, 3000);

            setNewName("");
            setNewPhone("");
          }
        );
      }
    } else {
      alert(`${newName} already exist in your contacts`);
    }
  }

  function handleOnDeleteClick(id) {
    ContactService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id));
    })
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
      <Toast message={toastMessage} toastClass={toastClass} />
      <h2>Numbers</h2>
      <PhonebookList persons={persons.filter(filterPersons)} handleOnDeleteClick={handleOnDeleteClick} />
    </div>
  );
};

export default App;
