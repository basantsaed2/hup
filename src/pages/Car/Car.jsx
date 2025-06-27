import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute.jsx'; // أو المسار الصحيح

import Caetogries from './Caetogries';
import BRANDS from './BRANDS';
import MODELS from './MODELS';
import CARS from './CARS';
import AddCaetogries from './addcars/AddCaetogries';
import AddBRANDS from './addcars/AddBRANDS';
import AddMODELS from './addcars/AddMODELS';
import AddCARS from './addcars/AddCARS';

const Car = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute moduleName="car_categories" requiredAction="view">
            <Caetogries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddCaetogries"
        element={
          <ProtectedRoute moduleName="car_categories" requiredAction="add">
            <AddCaetogries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/BRANDS"
        element={
          <ProtectedRoute moduleName="car_brands" requiredAction="view">
            <BRANDS />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddBRANDS"
        element={
          <ProtectedRoute moduleName="car_brands" requiredAction="add">
            <AddBRANDS />
          </ProtectedRoute>
        }
      />
      <Route
        path="/MODELS"
        element={
          <ProtectedRoute moduleName="car_models" requiredAction="view">
            <MODELS />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddMODELS"
        element={
          <ProtectedRoute moduleName="car_models" requiredAction="add">
            <AddMODELS />
          </ProtectedRoute>
        }
      />
      <Route
        path="/CARS"
        element={
          <ProtectedRoute moduleName="cars" requiredAction="view">
            <CARS />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddCARS"
        element={
          <ProtectedRoute moduleName="cars" requiredAction="add">
            <AddCARS />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Car;
