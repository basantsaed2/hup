import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute.jsx'; // أو المسار الصحيح

import TrainType from './TrainType';
import TrainClass from './TrainClass';
import TrainRoute from './TrainRoute';
import Trains from './Trains';
import AddTraintype from './Addpage/AddTraintype';
import AddTrainRoute from './Addpage/AddTrainRoute';
import AddTrainClass from './Addpage/AddTrainClass';
import Addtrains from './Addpage/Addtrains';

const Train = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute moduleName="trainTypes" requiredAction="view">
            <TrainType />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddTraintype"
        element={
          <ProtectedRoute moduleName="trainTypes" requiredAction="add">
            <AddTraintype />
          </ProtectedRoute>
        }
      />
      <Route
        path="/TrainClass"
        element={
          <ProtectedRoute moduleName="trainclasses" requiredAction="view">
            <TrainClass />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddTrainClass"
        element={
          <ProtectedRoute moduleName="trainclasses" requiredAction="add">
            <AddTrainClass />
          </ProtectedRoute>
        }
      />
      <Route
        path="/TrainRoute"
        element={
          <ProtectedRoute moduleName="trainRoutes" requiredAction="view">
            <TrainRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddTrainRoute"
        element={
          <ProtectedRoute moduleName="trainRoutes" requiredAction="add">
            <AddTrainRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Trains"
        element={
          <ProtectedRoute moduleName="trains" requiredAction="view">
            <Trains />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Addtrains"
        element={
          <ProtectedRoute moduleName="trains" requiredAction="add">
            <Addtrains />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Train;
