import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute.jsx'; // أو المسار الصحيح

import Countries from './Countries';
import AddCountries from './Addpage/AddCountries.jsx';
import Addcities from './Addpage/Addcities.jsx';
import Cities from './Cities.jsx';
import Zones from './Zones.jsx';
import Addzones from './Addpage/AddZones.jsx';
import Stations from './Stations.jsx';
import AddOffStation from './Addpage/AddOffStation.jsx';

const Location = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute moduleName="countries" requiredAction="view">
            <Countries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddCountries"
        element={
          <ProtectedRoute moduleName="countries" requiredAction="add">
            <AddCountries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Cities"
        element={
          <ProtectedRoute moduleName="cities" requiredAction="view">
            <Cities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Addcities"
        element={
          <ProtectedRoute moduleName="cities" requiredAction="add">
            <Addcities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Zones"
        element={
          <ProtectedRoute moduleName="zones" requiredAction="view">
            <Zones />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Addzones"
        element={
          <ProtectedRoute moduleName="zones" requiredAction="add">
            <Addzones />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Stations"
        element={
          <ProtectedRoute moduleName="stations" requiredAction="view">
            <Stations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddOffStation"
        element={
          <ProtectedRoute moduleName="stations" requiredAction="add">
            <AddOffStation />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Location;
