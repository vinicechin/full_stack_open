import { useState, useEffect } from "react";
import { Toast } from "./components/Toast";
import CountriesService from "./services/countries";

import '../index.css';

const App = () => {
  const [toastMessage, setToastMessage] = useState(null);
  const [toastClass, setToastClass] = useState("success");
  const [filter, setFilter] = useState("");
  const [content, setContent] = useState(null);

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

  useEffect(() => {
    CountriesService.getCountries(filter.toLowerCase()).then(countries => {
      if (countries != null && countries instanceof Array && countries.length > 0) {
        console.log(countries)
        if (countries.length > 10) {
          setContent("Too many matches, specify another filter");
        } else if (countries.length > 1) {
          const list = (
            <ul>
              {countries.map(country => {
                return (
                  <li key={country.name.official}>{country.name.official} ({country.name.common})</li>
                );
              })}
            </ul>
          );
          setContent(list)
        } else {
          const countryData = countries[0];
          const countryEl = (
            <>
              <h1>{countryData.name.official} ({countryData.name.common})</h1>
              <p>Capital {countryData.capital[0]}</p>
              <p>Area {countryData.area}</p>
              <h2>Languages</h2>
              <ul>
                {Object.entries(countryData.languages).map(([, value]) => {
                  return <li>{value}</li>
                })}
              </ul>
              <img src={countryData.flags.png} alt={countryData.flags.alt} />
            </>
          );
          setContent(countryEl);
        }
      } else {
        setContent(null);
      }
    });
  }, [filter]);

  return (
    <div>
      <Toast message={toastMessage} toastClass={toastClass} />

      <span>Country filter</span>
      <input onChange={handleOnChange} placeholder="Search country" />
      <br />
      {content}
    </div>
  );
};

export default App;
