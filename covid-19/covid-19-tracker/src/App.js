import React ,{useState,useEffect} from "react";
import './App.css';
import {MenuItem,FormControl,Select,Card, CardContent} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import {sortData} from "./util"
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
    const[countries,setCountries]=useState([]);
    const [country,setCountry]=useState("Worldwide");
    const [countryInfo,setCountryInfo]=useState({});
    const [tableData,setTableData]=useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(4);
    const [mapCountries,setMapCountries]=useState([]);
      useEffect(() =>{
        fetch("https://disease.sh/v3/covid-19/all").then(response => response.json()).
        then(data =>{
          setCountryInfo(data);
        });
      },[]);

     useEffect(() => {
      const getCountriesData =async() =>{
        await fetch("https://disease.sh/v3/covid-19/countries").
        then((response) => response.json()).then((data) =>{
          const countries=data.map((country) =>({
            name:country.country,
            value:country.countryInfo.iso2
          }));
          const sortedData=sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
      };
      getCountriesData();
     }, [])

     const onCountryChange= async (event)=>{
       const countryCode=event.target.value;
       console.log(countryCode);
       setCountry(countryCode);

       const url=countryCode==="Worldwide"?"https://disease.sh/v3/covid-19/all":
       `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;

         await fetch(url).then((response) =>response.json()
         ).then(data => {
           setCountry(countryCode);
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        })
         
     }

  return (
    <div className="app">
    <div class="app__left">
    <div className="app__header">
    <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
      <Select
      onChange={onCountryChange}
      variant="outlined"
      value={country}>
      <MenuItem value="Worldwide">Worldwide</MenuItem>
         {
           countries.map((country) =>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
           ))
         }
        {/*<MenuItem value="worldwide">Worldwide</MenuItem>
        <MenuItem value="worldwide">w</MenuItem>
        <MenuItem value="worldwide">Worldwide</MenuItem>
        <MenuItem value="worldwide">Worldwide</MenuItem>*/}
      </Select>
      </FormControl>
    </div>

    <div className="app__stats">
      <InfoBox
        title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}
      />
      <InfoBox
        title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}
      />
      <InfoBox
        title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}
      />
    </div>
     
    <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />

    </div>



    <Card className="app__right">
     <CardContent>
       <h3>Live cases by country </h3>
       <Table countries={tableData}/>
       <h3>Worldwide New Cases</h3>
       <LineGraph/>
     </CardContent>


    </Card>


    </div>
  );
}

export default App;


//the async method is used get the api request..request something and wait to get the response
//menu-item is from material-UI

