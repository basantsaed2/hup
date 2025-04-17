import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BusesBuses from './BusesBuses.jsx'
import TypeBuses from './TypeBuses.jsx'
import BusesHistory from './BusesHistory.jsx'
import AddBuses from './addbuses/AddBuses.jsx';
import AddTypeBuses from './addbuses/AddTypeBuses.jsx';
import AddBusesHistory from './addbuses/AddBusesHistory.jsx'
const Buses = () => {
  return (
    <div>
       <Routes>
        
        <Route path="/" element={<BusesBuses/>} />
        <Route path="/TypeBuses" element={<TypeBuses />} />
        <Route path="/BusesHistory" element={<BusesHistory />} />
        <Route path="/AddBuses" element={<AddBuses />} />
        <Route path="/AddTypeBuses" element={<AddTypeBuses />} />
        <Route path="/AddBusesHistory" element={<AddBusesHistory />} />
   
      </Routes>
    </div>
    
  )
}

export default Buses
