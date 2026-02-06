import {useState, useEffect} from 'react'
import axios from 'axios'
import Weather from './components/Weather'

const SearchForm = ({value, onChange}) => {
  return (
    <div>
      Find countries: <input value={value} onChange={onChange} />
    </div>
  )
}


const App = () => {

  const [allCountries, setAllCountries] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  //fetching data for all countries from api and storing to allCountries
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all/')
      .then(response => {
        console.log('getting country data')
        setAllCountries(response.data)
        console.log('set country data to allCountries')
        
      })
    }, [])
  
  const handleSearch = (event) => {
      setSearchValue(event.target.value)
    }

  if (!allCountries) {
    return null
  }

  const foundCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()))
  console.log(`Found ${foundCountries.length} countries`)

  let displayCountries

  if (foundCountries.length > 10) {
    displayCountries = <p>Too many matches, specify you search</p>
  } else if (foundCountries.length > 1) {
    displayCountries = (
    <ul>
      {foundCountries.map(country => 
      <li key={country.name.common}>
        {country.name.common}
          <button onClick={() => setSearchValue(country.name.common)}>
          Show</button>
        </li>
      )}
    </ul>
    )
  } else if (foundCountries.length === 1) {
      const specifiedCountry = foundCountries[0]
      displayCountries = (
      <div>
        <h2>{specifiedCountry.name.common}</h2>
        <p>Capital: {specifiedCountry.capital}</p>
        <p>Area: {specifiedCountry.area}</p>
        <h3>Languages:</h3> 
        <ul>
          {/* converting languages object to array */}
          {Object.values(specifiedCountry.languages).map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={specifiedCountry.flags.png} alt={specifiedCountry.flags.alt} />
        <Weather city={specifiedCountry.capital} />
      </div>
    )
  } else {
      displayCountries = <p>No matches</p>
  }

  return (
    <div>
      <h1>Finding countries</h1>
      <SearchForm value={searchValue} onChange={handleSearch} />
      <p>Matches found: {foundCountries.length}</p>

      <p>{foundCountries.length > 10  }</p>
      <div>{displayCountries}</div>
      
    </div>
  )
}

export default App