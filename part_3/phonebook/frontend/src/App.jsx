import { useState, useEffect } from "react";
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
    handleFetchContacts();
  }, []);

  function handleFetchContacts() {
    ContactService.getAll().then((initContacts) => {
      setPersons(initContacts);
    });
  }

  function handleToast(toastType, toastMessage) {
    setToastClass(toastType);
    setToastMessage(toastMessage);
    setTimeout(() => {
      setToastMessage(null)
    }, 3000);
  }

  function handleOnAddClick(newName, newPhone) {
    if (newName.length > 0) {
      let update = false;

      const oldPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
      if (oldPerson != null) {
        update = window.confirm(`Are you sure you want to update the contact for ${oldPerson.name}?`);
      }

      if (update) {
        ContactService.update(oldPerson.id, { name: newName, number: newPhone }).then(
          (newContact) => {
            setPersons(persons.map(p => p.id === oldPerson.id ? newContact : p));
            
            handleToast("success", `Updated ${newName} contact info.`);

            setNewName("");
            setNewPhone("");
          }
        ).catch((err) => {
          handleToast("error", `${err.response.data.error}`);
          handleFetchContacts();
        });
      } else {
        ContactService.create({ name: newName, number: newPhone }).then(
          (newContact) => {
            setPersons(persons.concat(newContact));
            
            handleToast("success", `Added ${newName} to contacts.`);

            setNewName("");
            setNewPhone("");
          }
        ).catch((err) => {
          handleToast("error", `${err.response.data.error}`);
          handleFetchContacts();
        });
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
