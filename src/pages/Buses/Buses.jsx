import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute.jsx'; // أو المسار الصحيح

import BusesBuses from './BusesBuses.jsx';
import TypeBuses from './TypeBuses.jsx';
import BusesHistory from './BusesHistory.jsx';
import AddBuses from './addbuses/AddBuses.jsx';
import AddTypeBuses from './addbuses/AddTypeBuses.jsx';
import AddBusesHistory from './addbuses/AddBusesHistory.jsx';

const Buses = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute moduleName="bus" requiredAction="view">
            <BusesBuses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/TypeBuses"
        element={
          <ProtectedRoute moduleName="bus_types" requiredAction="view">
            <TypeBuses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Aminites"
        element={
          <ProtectedRoute moduleName="aminites" requiredAction="view">
            <BusesHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddBuses"
        element={
          <ProtectedRoute moduleName="bus" requiredAction="add">
            <AddBuses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddTypeBuses"
        element={
          <ProtectedRoute moduleName="bus_types" requiredAction="add">
            <AddTypeBuses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddAminites"
        element={
          <ProtectedRoute moduleName="aminites" requiredAction="add">
            <AddBusesHistory />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Buses;
