

// https://disease.sh/v3/covid-19/countries
import './App.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useEffect, useState } from 'react';
import Infobox from './Infobox';
import Map from './Map'
import 'leaflet/dist/leaflet.css'
import Table from './Table'
import Card from '@material-ui/core/Card';
import Linegraph from './Linegraphs'
// import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
// import { CardContent } from '@material-ui/core';
function App() {
  const [countries, setcountries] = useState([])
  const [country, setcountry] = useState(["WorldWide"])
  const [countryInfo, setcountryInfo] = useState({})
  const [tableData, settableData] = useState([])
  const [mapCenter, setmapCenter] = useState({
    lat:20.5937, lng:78.9629
  })
  const [mapZoom, setmapZoom] = useState(3)
  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries").then(response => response.json()).then(data => {
        const countries = data.map(count => (
         {
          name: count.country,
          value: count.countryInfo.iso2
         }
        ))
        // console.log(data)
        settableData(data)
        setcountries(countries)
      })
    }
    getCountriesData();
  }, [])


  useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all"
      ).then(response => response.json()).then(
        data => {
          setcountryInfo(data)
        }
      )
  }, [])

  
  const onCountryChange = async(e) => {
    const CountryCode = e.target.value
    //  e.preventDefault()
    const url = CountryCode === "Worldwide" ?
   `https://disease.sh/v3/covid-19/all`
     : `https://disease.sh/v3/covid-19/countries/${CountryCode}?strict=true
     `
    await fetch(url).then(
      response => response.json()
    ).then(
      data => {
        setcountry(CountryCode)
        // console.log(data.countryInfo.lat)
         setmapCenter([
          data.countryInfo.lat, data.countryInfo.lng
         ])
          setcountryInfo(data)
          setmapZoom(4)
      }
    )

    

  }

 
  return (
    <div className="app">
      <div className="app__left">

      <div className="app__header">
              <h1>COVID-19 TRACKER</h1>
                  <FormControl className="app__dropdown">
                      <Select variant="outlined"
                      value={country}
                      onChange={onCountryChange}>
                      <MenuItem value="worldwide">Worldwide</MenuItem>
                       {
                         countries.map(country => (
                           <MenuItem value={country.value}>{country.name}</MenuItem>
                         ))
                       }
                      </Select>
                  </FormControl>
    </div>

    <div className="app__state">
      <Infobox title="CoronaVirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>
      <Infobox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
      <Infobox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
    </div>
       <div>
         <Map centers={mapCenter} zoom={mapZoom}/>
       </div>

      </div>
      <Card className="app__right">
          <CardContent>
            <h3>🔴 Live Cases by Country</h3>
            <Table countries={tableData}/>
            <h3>Worldwide new cases</h3>
            <Linegraph />
          </CardContent>

      </Card>
         
    </div>
  );
}

export default App;
