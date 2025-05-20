export function CountriesList({ countries, handleOnShow }) {
  function handleShowClick(e) {
    e.preventDefault();
    handleOnShow(country.name.official)
  }
  return (
    <ul>
      {countries.map((country) => {
        return (
          <li key={country.name.official} style={{ marginBottom: 5 }}>
            {country.name.official} ({country.name.common})
            <button style={{ marginLeft: 5 }} onClick={handleShowClick}>
              Show
            </button>
          </li>
        );
      })}
    </ul>
  );
}
