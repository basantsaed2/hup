import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Caetogries from './Caetogries'
import BRANDS from './BRANDS'
import MODELS from './MODELS'
import CARS from './CARS'
import AddCaetogries from './addcars/AddCaetogries'
import AddBRANDS from './addcars/AddBRANDS'
import AddMODELS from './addcars/AddMODELS'
import AddCARS from './addcars/AddCARS'
const Car = () => {
  return (
    <Routes>
        
    <Route path="/" element={<Caetogries/>} />
    <Route path="/BRANDS" element={<BRANDS/>} />
    <Route path="/MODELS" element={<MODELS/>} />
    <Route path="/CARS" element={<CARS/>} />
    <Route path="/AddCaetogries" element={<AddCaetogries/>} />
    <Route path="/AddBRANDS" element={<AddBRANDS/>} />
    <Route path="/AddMODELS" element={<AddMODELS/>} />
    <Route path="/AddCARS" element={<AddCARS/>} />
 
  </Routes>
  )
}

export default Car
