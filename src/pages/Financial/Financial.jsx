import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Payments from './Payments';
import Commissions from './Commissions';
import PendingPayments from './PendingPayments';

const Financial = () => {
  return (
    <div>
      <Routes>
        <Route path="/Payments" element={<Payments />} />
        <Route path="/Commissions" element={<Commissions />} />
        <Route path="/PendingPayments" element={<PendingPayments />} />
      </Routes>
    </div>
  );
};

export default Financial;