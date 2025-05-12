import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HistoryPayout from "./HistoryPayout"
import Cancelpayout from "./Cancelpayout"
import PayoutAccount from "./PayoutAccount"

const Allpayot = () => {
  return (
    <div>
        <Routes>
        
        <Route path="/" element={<PayoutAccount/>} />
        <Route path="/Cancelpayout" element={<Cancelpayout/>} />
        <Route path="/HistoryPayout" element={<HistoryPayout/>} />
        
      </Routes>
    </div>
  )
}

export default Allpayot
