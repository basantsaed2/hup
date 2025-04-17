import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HistoryPayout from "./HistoryPayout"
import Cancelpayout from "./Cancelpayout"
import PayoutAccount from "./PayoutAccount"

const Allpayot = () => {
  return (
    <div>
        <Routes>
        
        <Route path="/" element={<HistoryPayout/>} />
        <Route path="/Cancelpayout" element={<Cancelpayout/>} />
        <Route path="/PayoutAccount" element={<PayoutAccount/>} />
        
      </Routes>
    </div>
  )
}

export default Allpayot
