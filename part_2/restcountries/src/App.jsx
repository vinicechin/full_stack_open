import { useState, useEffect } from "react";
import { Toast } from "./components/Toast";
import { Country } from "./components/Country";
import { CountriesList } from "./components/CountriesList";
import CountriesService from "./services/countries";

import '../index.css';

const App = () => {
  const [toastMessage, setToastMessage] = useState(null);
  const [toastClass, setToastClass] = useState("success");
  const [filter, setFilter] = useState("");
  const [content, setContent] = useState(null);
  const [handler, setHandler] = useState(null);

  function handleToast(toastType, toastMessage) {
    setToastClass(toastType);
    setToastMessage(toastMessage);
    setTimeout(() => {
      setToastMessage(null)
    }, 3000);
  }

  function handleOnChange(e) {
    e.preventDefault();
    setFilter(e.target.value);
  }

  function handleOnShow(countryName) {
    setFilter(countryName)
  }

  function handleContentSelection(countries) {
    if (countries != null && countries instanceof Array && countries.length > 0) {
      if (countries.length > 10) {
        setContent(`Too many matches (${countries.length}), specify another filter`);
      } else if (countries.length > 1) {
        setContent(<CountriesList countries={countries} handleOnShow={handleOnShow} />)
      } else {
        const countryData = countries[0];
        setContent(<Country countryData={countryData} />);
      }
    } else {
      setContent(null);
    }
  }

  useEffect(() => {
    if (handler != null) {
      clearTimeout(handler);
    }

    const timeoutHandler = setTimeout(() => {
      CountriesService.getCountries(filter.toLowerCase()).then(countries => {
        setHandler(null);
        handleContentSelection(countries);
      });
    }, 200);

    setHandler(timeoutHandler);
  }, [filter]);

  return (
    <div>
      <Toast message={toastMessage} toastClass={toastClass} />

      <span>Country filter</span>
      <input value={filter} onChange={handleOnChange} placeholder="Search country" />
      <br />
      {content}
    </div>
  );
};

export default App;
