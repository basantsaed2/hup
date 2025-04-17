import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Countries from './Countries'
import AddCountries from './Addpage/AddCountries.jsx';
import Addcities from './Addpage/Addcities.jsx';
import Cities from './Cities.jsx';
import Zones from './Zones.jsx';
import Addzones from './Addpage/AddZones.jsx';
import Stations from './Stations.jsx';
import AddOffStation from './Addpage/AddOffStation.jsx'

const Location = () => {
  return (
<div>

    <Routes>
        
        <Route path="/" element={<Countries/>} />
        <Route path="/AddCountries" element={<AddCountries/>} />
        <Route path="/Cities" element={<Cities/>} />
        <Route path="/Addcities" element={<Addcities/>} />
        <Route path="/Zones" element={<Zones/>} />
        <Route path="/Addzones" element={<Addzones/>} />
        <Route path="/Stations" element={<Stations/>} />
        <Route path="/AddOffStation" element={<AddOffStation/>} />
      </Routes>
</div>
  );

};

export default Location;
