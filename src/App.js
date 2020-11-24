import './App.css';
import { MenuItem,FormControl,Select } from '@material-ui/core';
import { useState,useEffect } from 'react';
import InfoBox from './components/InfoBox/InfoBox';
import Map from './components/Map/Map';

function App() {
  const [countries,setCountries]= useState([]);
  const [country,setCountry] = useState('Worldwide');

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
          .then((response) => response.json())
          .then((data) => {
            const countries = data.map((country) => (
              {
                name:country.country,
                value:country.countryInfo.iso2
              }
            ));
            setCountries(countries);
          });
    }
    getCountriesData();
  },[])

  const onCountryChange = async (e) => {
      const countryCode = e.target.value;
      setCountry(countryCode);
  }
  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select varient="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={2000} total={3000} />
        <InfoBox title="Recoveries" cases={2000} total={3000}/>
        <InfoBox title="Deaths" cases={2000} total={3000}/>
      </div>

      <Map />
     
    </div>
  );
}

export default App;
