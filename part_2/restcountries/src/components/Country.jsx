export function Country({ countryData }) {
  return (
    <>
      <h1>
        {countryData.name.official} ({countryData.name.common})
      </h1>
      <p>Capital {countryData.capital[0]}</p>
      <p>Area {countryData.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(countryData.languages).map(([, value]) => {
          return <li>{value}</li>;
        })}
      </ul>
      <img src={countryData.flags.png} alt={countryData.flags.alt} />
    </>
  );
}
